const path = require('path');
const fs = require('fs');
const Module = require('./Module');

class Bundle {
  constructor ({ entry }) {
    this.entryPath = path.resolve(entry);
    this.modules = {};
    this.statements = []; // ast top level nodes
  }

  build (outputFile) {
    const entryModule = this.entryModule = this.fetchModule(this.entryPath);
    this.statements = entryModule.expandAllStatements();
    const code = this.generate();
    fs.writeFileSync(outputFile, code);
  }

  generate () {
    let code = '';
    this.statements.forEach(statement => {
      let content = statement._source;
      if (statement.type === 'ExportNamedDeclaration') {
        content = content.replace(/export\s+/, '');
      }
      code += `${content}\n`;
    });
    return code;
  }

  fetchModule (importee) {
    if (importee) {
      const content = fs.readFileSync(importee, 'utf8');
      const module = new Module({ code: content, path: importee, bundle: this });
      return module;
    }
    return {};
  }
}

module.exports = Bundle;
