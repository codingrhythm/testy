//use for Django's Ajax Post提交
function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ajaxSend(function(event, xhr, settings) {

    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

$(function(){

	

	$('.item').each(function(){
		$(this).hover(
			function(){
				refresh_btns($(this));
			},
			function(){
				$(this).find('.btns').hide();
			}
		);
	});

	$('.btn-item-action').click(function(){
		var parent = $(this).parent().parent();
		if ($(this).hasClass('btn-success'))
		{

			parent.removeClass('pending');
			parent.addClass('closed');

		}
		else if ($(this).hasClass('btn-fail'))
		{
			parent.removeClass('pending');
			parent.addClass('failed');
		}
		else if ($(this).addClass('btn-primary'))
		{
			parent.attr('class','item pending')
		}


		$('#'+$(this).attr('group')).find('.done').html($('dd.pending[group="'+$(this).attr('group')+'"]').length);

		refresh_btns(parent);
		refresh_group();
	});

	$('.btn-save-test').click(function(){save_test()});

	refresh_group();
});

function refresh_btns(target)
{
	target.find('.btns').hide();

	if (target.hasClass('pending'))
	{
		target.find('.btns-pending').show();
	}
	else
	{
		target.find('.btns-done').show();
	}	
}

function refresh_group()
{
	$('.group').each(function(){
		var total = $('dd[group="'+$(this).attr('id')+'"]').length;
		var pending = $('dd[group="'+$(this).attr('id')+'"].pending').length;
		$(this).find('span.all').html(total);
		$(this).find('span.done').html(total - pending);

	});

}

function save_test()
{
	if ($('.pending').length > 0)
	{
		alert('You still have '+$('.pending').length+' untested items. Please make sure all items have been tested before continue.');
		return;
	}

	$('.btns').remove();
	
	var data = {data:$('.list-tests').html(),id:$('#test-id').val(),fails:$('.failed').length};

	$.ajax({
        url:'/save/run/',
        type:"POST",
        data:data,
        error:function(data){alert('Oops! Something is going wrong!')},
        success:function(data){
            window.location = '/tests/';
        }
    });
}