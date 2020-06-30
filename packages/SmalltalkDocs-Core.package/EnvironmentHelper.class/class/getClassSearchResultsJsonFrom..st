serializer
getClassSearchResultsJsonFrom: aSearchString
	| result matcher allClasses matchedClasses|
	matcher := SearchMatcher new.
	matcher searchTerm: aSearchString.
	allClasses := Environment current classNames.
	matchedClasses := allClasses select: [:class | matcher matches: class].
	result := Dictionary newFrom: {'classes' -> matchedClasses}.
	^ result asJsonString