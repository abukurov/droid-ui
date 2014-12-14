DroidUI
=======

# Developing

## Branch naming

All branches should have prefix to determine what kind of issue you are working on.

### Features

```
features/short-descriptive-issue-name
```

### Bugs

```
bugs/short-descriptive-issue-name
```

## Code style guide

[https://github.com/felixge/node-style-guide](https://github.com/felixge/node-style-guide)

## Setup environment

To compile and run project you should have following installed:

* [NodeJs](http://nodejs.org/download)
* Gulp task runner `npm i -g gulp`
* Bower `npm i -g bower`

Most of the dependencies are served by [npm](https://www.npmjs.org/doc), so after any checkout or
merge make sure you run following command

```
npm install
bower install
```
**Note**
If you are installing some package using `npm` or `bower` that supposed to be used by all developers, make
sure you install it with `--save` or `--save-dev` flag. It will be automatically added to
`package.json` or `bower.json`. Ex.

```
npm i --save request
```

## Gulp tasks

### Running gulp tasks in different environments.

#### Run service

```
gulp
```

#### Compilation sass

```
gulp sass
```

#### Build scripts

```
gulp scripts
```
