"use strict";
exports.__esModule = true;
var appRoot = require('app-root-path');
var construction = require('./construction/construction');
var geneseApi = new construction.Construction();
geneseApi.startConstruction();
