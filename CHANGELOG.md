# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2020-08-31

### Added

  - Support for parameters defined in route callback file names. Note that this might break behaviour if your route callback file names had underscores in them, hence the major version bump.

## [2.0.0] - 2020-04-16

### Changed

  - Breaking: change module namespace from @ind.ie to @small-tech.
  - Update package file and readme to match structure of other related modules.
  - Update example so it can be run from any path.

## [1.2.1] - 2019-09-29

### Fixed

  - Trailing slashes in routes are now handled the same way under Windows as on other platforms.

## [1.2.0] - 2019-09-28

### Added

  - Windows support.

## [1.1.2] - 2019-07-23

### Fixed

  - No longer caches the wrong directory root when called with different directories.

### Fixed

## [1.1.1] - 2019-05-15

### Fixed

  - No longer hardcoded to only work with a root folder called `.routes`.

## [1.1.0] - 2019-05-14

### Added

  - Ignore `node_modules` folder.
  - Ignore hidden folders (folders with names that start with a dot).

## [1.0.0] - 2019-05-14

Initial release.
