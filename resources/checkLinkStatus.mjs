import { get } from "https";

async function checkLinkStatus(baseUrl) {
  const link = baseUrl + "/chekConnection";

  return new Promise((resolve, reject) => {
    get(link, async (res) => {
      if (res.statusCode === 201) {
        const response = await requestResponseParser(res);

        resolve({ statusCode: res.statusCode, response });
      } else {
        reject({ error: "The connection is failing!" });
      }
    }).on("error", (err) => {
      reject({ error: err.message });
    });
  });
}

function requestResponseParser(res) {
  return new Promise((resolve, _) => {
    let data = [];

    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      const responseData = JSON.parse(Buffer.concat(data).toString());
      resolve(responseData);
    });
  });
}

export { checkLinkStatus };
