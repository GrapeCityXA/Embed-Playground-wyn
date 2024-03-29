const interfaceBaseUrl = WYN.WYN_INTERFACE_HOST;
const interfaceToken = WYN.WYN_INTERFACE_TOKEN;

export function sendRequest(requestObj: any) {
  if (requestObj.url) {
    return apiQuery(requestObj);
  } else {
    return graphqlQuery(requestObj);
  }
}

async function graphqlQuery(requestObj: any) {
  const url = interfaceBaseUrl + '/api/graphql?token=' + interfaceToken;
  const options: any = {
    GC_WYN_API_TITLE: requestObj.displayName,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      query: requestObj.graphqlStr
    })
  };
  return new Promise(function (resolve) {
    fetch(url, options).then(function (res) {
      if (!res.ok) {
        throw new Error('Bad status code from server.');
      }
      return res.json();
    }).then(function (res) {
      resolve(res);
    }).catch((error) => {
      console.log(error);
    });
  });
}

async function apiQuery(requestObj: any) {
  let url = `${interfaceBaseUrl}/${requestObj.url}?token=${interfaceToken}`;
  if (requestObj.params) {
    url += `&${requestObj.params}`;
  }
  const options: any = {
    GC_WYN_API_TITLE: requestObj.displayName,
    method: requestObj.method,
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    mode: 'cors'
  };
  let requestBody = "";
  if (requestObj.body) {
    requestBody = typeof requestObj.body === "object" && !(requestObj.body instanceof File) ? JSON.stringify(requestObj.body) : requestObj.body;
    options.body = requestBody;
  }
  return new Promise(function (resolve) {
    fetch(url, options).then(function (res) {
      if (!res.ok) {
        throw new Error('Bad status code from server.');
      }
      return res.json();
    }).then(function (res) {
      resolve(res);
    });
  })
}


const defaultFmt = "YYYY年mm月dd日 HH时MM分SS秒";

export const formatTime = (date: any, fmt?: any) => {
  date = new Date(date);
  fmt = fmt || defaultFmt;
  let ret;
  const opt: any = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}