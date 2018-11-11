# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.0.0-alpha.2] - 2017-06-20
### Added
- Adds and exposes Type Sum Type to allow shape and argument validation
- Adds argument validation to Enum

### Changed
- Refactors and reduces some of the functions to improve build size and performace

## [1.0.0-alpha.0] - 2017-06-20
### Added
- Adds `cata` and `reduce` aliases for `caseOf`
- Changelogs

### Changed
- Moves documentation from Github Wiki to /docs to be easier to maintain
- Some code refactoring to improve code quality and performance
- Internal semantics to be more consistent in the way we describe the functions

### Removed
- useReducer and reducerComponent HOC, to trim the fat as both the functionalities are just one of the use cases and can be provided as a custom wrapper. The documentation includes the internals of the functions if anyone wants to use them
- Removes some properties and methods from the instances to make it lighter and expose a simpler api

[1.0.0-alpha.0]: https://github.com/phenax/enum-fp/compare/v0.5.0...v1.0.0-alpha.0
