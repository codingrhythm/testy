import re
import models

def get_test_contents(path, items):

	tests = models.Test.objects.filter(path=path)

	for test in tests:
		items += parse_contents(test.contents)


def parse_contents(contents):
	items = []

	lines = contents.split('\r\n')


	group = {'title':'','items':[]}

	for line in lines:
		values = line.split(':')

		if len(values) != 2:
			continue

		if values[0] == u'g':
			
			if len(group['items']) > 0:
				items.append(group)

			group = {}
			group['title'] = values[1]
			group['items'] = []

		elif values[0] == u'i':
			group['items'].append(values[1])

		elif values[0] == u't':
			get_test_contents(values[1], items)

	if len(group['items']) > 0:
		items.append(group)

	return items