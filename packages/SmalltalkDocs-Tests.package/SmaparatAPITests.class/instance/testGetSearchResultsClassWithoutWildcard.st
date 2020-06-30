testing GetSearchResults
testGetSearchResultsClassWithoutWildcard
	| result contents classes |
	result := RPTestHelper get: '/env/search/class/SmapratMockClass' on: self api.
	self assert: result contentType = 'application/json'.
	self assert: result status = #ok.
	contents := Json readFrom: result contents contents readStream.
	classes := (contents at: 'classes').
	self deny: (classes includes: 'MockClassNoComment').
	self assert: (classes includes: 'SmapratMockClass').
	self assert: (classes allSatisfy: [:class |(class includesSubstring: 'SmapratMockClass')]).