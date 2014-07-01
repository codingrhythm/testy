from django.db import models
from functions import parse_contents

class Test(models.Model):

	name = models.CharField(max_length=200)
	path = models.CharField(max_length=250, db_index=True)
	contents = models.TextField()
	last_update = models.DateTimeField(auto_now=True)
	num_of_items = models.IntegerField(default=0)

	@property
	def items(self):
		return parse_contents(self.contents) 
    
    
class TestCase(models.Model):

	test = models.ForeignKey(Test, related_name='cases')
	test_date = models.DateTimeField(auto_now_add=True)
	report = models.TextField()
	fails = models.IntegerField(default=0)
	tested_by = models.CharField(max_length=100, default='Testy')

	class Meta:
		ordering = ['-test_date',]
