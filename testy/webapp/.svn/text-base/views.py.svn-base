from django.http import HttpResponse,HttpResponseRedirect
from django.views.generic.simple import direct_to_template
from models import Test, TestCase
from functions import parse_contents


def index(request):

	p = {}
	p['p'] = 'overview'
	p['tests_count'] = Test.objects.all().count()
	p['results_count'] = TestCase.objects.all().count()
	return direct_to_template(request, 'index.html', p)


def tests(request):

	p = {}
	p['p'] = 'tests'

	tests = TestCase.objects.all()

	if 'id' in request.GET:
		tests = tests.filter(test_id=request.GET['id'])

	p['tests'] = tests

	return direct_to_template(request, 'tests.html', p)


def management(request):

	p = {}
	p['p'] = 'management'
	p['tests'] = Test.objects.all()
	return direct_to_template(request, 'management.html', p)


def test(request):
	p = {}
	p['p'] = 'management'

	if 'id' in request.GET:
		p['id'] = request.GET['id']
		test = Test.objects.get(id=p['id'])
		p['name'] = test.name
		p['path'] = test.path
		p['contents'] = test.contents

	if 'POST' in request.method:
		name = request.POST['name']
		path = request.POST['path']
		contents = request.POST['contents']

		items = parse_contents(contents)

		total = 0
		for item in items:
			total += len(item['items'])

		if 'id' in request.POST:
			test = Test.objects.get(id=request.POST['id'])
		else:
			test = Test()
			
		test.name = name
		test.path = path
		test.contents = contents
		test.num_of_items = total
		test.save()

		return HttpResponseRedirect('/management/')


	return direct_to_template(request, 'form-test.html', p)


def doc(request):
	p = {}
	p['p'] = 'document'
	return direct_to_template(request, 'doc.html', p)

def run_test(request, test_id):
	p = {}
	p['p'] = 'tests'
	p['test'] = Test.objects.get(id=test_id)
	return direct_to_template(request, 'run.html', p)

def view_result(request, result_id):
	p = {}
	p['p'] = 'tests'
	p['result'] = TestCase.objects.get(id=result_id)
	return direct_to_template(request, 'result.html', p)

def save_run(request):
	result = TestCase()
	result.test_id = request.POST['id']
	result.report = request.POST['data']
	result.fails = request.POST['fails']
	result.save()
	return HttpResponse('OK')