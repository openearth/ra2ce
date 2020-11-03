import axios from 'axios';
import { xmlRequestTemplate } from './template';

export default function({ functionId, requestData, polygon, roadsIdentifier, ...rest }) {
  const template = xmlRequestTemplate({ functionId, requestData, polygon, roadsIdentifier, ...rest });
  const WPS_URL = process.env.VUE_APP_WPS_URL;
  return axios({
    method: 'post',
    url: WPS_URL,
    data: template,
    headers: {'Content-Type': 'application/xml'}
  })
  .then(({ data }) => {
    console.log(data);
    console.log(typeof data === "object");
    return typeof data === 'object'
      ? data
      : JSON.parse(data);
  });
}
