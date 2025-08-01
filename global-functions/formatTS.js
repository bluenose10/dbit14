import * as ExternalPackages from '../custom-files/ExternalPackages';

const formatTS = (tsObj, formatStr) => {
  return ExternalPackages.dateFNSFormat(tsObj, formatStr || 'dd-MM-yyyy');
};

export default formatTS;
