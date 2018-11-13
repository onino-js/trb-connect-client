import Json2Csv from "json2csv";

const Parser = Json2Csv.Parser;

export const formatDate = date => {
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${day}/${month} ${hour}:${min}`;
};

export const formatCsv = ({ measures, probes }) => {
  let res = "";
  let jsonData = [];
  const fields = probes.map(probe => probe.name);
  fields.unshift("dateTime");
  measures.forEach(measure => {
    const probeName = probes.find(probe => probe.id === measure.probe.id).name;
    const row = jsonData.find(data => data.dateTime === measure.dateTime);
    if (row === undefined) {
      let newRow = { dateTime: measure.dateTime, [probeName]: measure.value };
      jsonData.push(newRow);
    } else {
      row[probeName] = measure.value;
    }
  });
  const parser = new Parser({ fields });
  res = parser.parse(jsonData);
  return res;
};

export const getMeanValue = probes => {
  const total = probes.reduce((acc, cur) => acc + cur.value, 0);
  return Math.round(total / probes.length);
};

export const getMaxValue = probes => {
  let probeName = "";
  const maxValue = probes.reduce((acc, cur) => {
    const test = acc <= cur.value;
    if (test) probeName = cur.name;
    return test ? cur.value : acc;
  }, probes[0].value);
  return {
    probeName: probeName,
    value: maxValue,
  };
};

export const getMinValue = probes => {
  let probeName = "";
  const minValue = probes.reduce((acc, cur) => {
    const test = acc >= cur.value;
    if (test) probeName = cur.name;
    return test ? cur.value : acc;
  }, probes[0].value);
  return {
    probeName: probeName,
    value: minValue,
  };
};
