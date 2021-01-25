module.exports = {
  parse: function(url = '') {
    const dicParams = {};
    const regex = /^[a-zA-Z0-9_./:%*+!|¬°~#-]+\?/;
    const regex1 = /^([a-zA-Z_]+[a-zA-Z0-9_]*)+=/;
    const str = url.replace(regex, '');
    const params = str.split('&');
    if (params.length > 0 && params[0] !== url) {
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        const name = regex1.exec(param)[0].replace('=', '');
        const value = param.replace(regex1, '');
        dicParams[name] = {
          value: value,
          params: {}
        };
        const internalParams = value.replace(regex, '').split('&');
        if (internalParams.length > 0) {
          if (internalParams[0] !== value) {
            for (let j = 0; j < internalParams.length; j++) {
              const internalParam = internalParams[j];
              let internalName = '';
              if (regex1.test(internalParam)) {
                internalName = regex1.exec(internalParam)[0].replace('=', '');
              } else {
                internalName = internalParam.replace('=', '');
              }
              const internalValue = internalParam.replace(regex1, '');
              dicParams[name].params[internalName] = internalValue;
            }
          }
        }
      }
    }

    return dicParams;
  }
}