
export const isNumber = (number) => !/\D/.test(number);
export const isLetters = (word) => /^[a-zA-Z_]+$/.test(word);
export const isCode = code => /^[a-zA-Z0-9]{3,3}$/.test(code);
export const isEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export const min = (val, len) => val.length < len;
export const max = (val, len) => val.length > len;
export const isDouble = val => /^(?:0|[1-9][0-9]*)\.[0-9]+$/i.test(val);
export const noWhiteSpace = val => /^[a-zA-Z0-9]*$/.test(val);
export const isBase64 = val => /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(val);
export const checkIfDuplicateExists = (w) => new Set(w).size !== w.length;

// eslint-disable-next-line no-useless-escape
export const isYoutubeUrl = url => /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)[A-Za-z0-9_-]{11}\&?/.test(url);
// eslint-disable-next-line no-useless-escape
export const isUrl = s => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);


