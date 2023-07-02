var selectedFile;
document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {
        selectedFile = event.target.files[0];
    });
document
    .getElementById("uploadExcel")
    .addEventListener("click", function () {
        if (selectedFile) {

            $("#outputList").empty();
            const index = [$(".date-1").val(), $(".date-2").val(), $(".date-3").val(), $(".date-4").val()];
            const inputValues = [$(".value-1").val(), $(".value-2").val(), $(".value-3").val(), $(".value-4").val()];

            const values = inputValues.map(function (str) {
                return /^\d+$/.test(str) ? parseInt(str, 10) : str;
            });
            const strongValues = [];
            const findSingle = [];
            for (let i in values) {
                if (typeof values[i] !== "string") {
                    console.log("insdie")
                    let valMinus = 1;
                    if (parseInt(i) < 1) {
                        valMinus = -1;
                    }
                    strongValues.push({
                        value: values[i],
                        date: index[i],
                        index: parseInt(i),
                        sub: 4 - (parseInt(i) + 1),
                        valMinus: valMinus
                    })
                }
            }

            for (let i in values) {
                if (typeof values[i] === "string") {
                    let valMinus = 1;
                    if (parseInt(i) < 1) {
                        valMinus = -1;
                    }
                    findSingle.push({
                        value: values[i],
                        date: index[i],
                        // index: parseInt(i) === 3 ? 2 : parseInt(i) - parseInt(i - 1),
                        index: parseInt(i),
                        sub: 4 - (parseInt(i) + 1),
                    })
                }
            }

            console.log("🚀 ~ file: index.html:116 ~ strongValues:", strongValues, findSingle, values, index);

            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach((sheet) => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    const data = [];
                    jsonObject = JSON.parse(jsonObject);

                    const monthsArray = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];

                    const updatedData = jsonObject.map(obj => {
                        const newObj = {};
                        Object.entries(obj).forEach(([key, value], keyIndex) => {
                            if (key.includes("EMPTY")) {
                                newObj[monthsArray[keyIndex - 1]] = value;
                            } else {
                                newObj[key] = value;
                            }
                        });

                        return newObj;
                    });
                    jsonObject = updatedData;
                    jsonObject.forEach((obj) => {
                        const firstObjectKey = Object.keys(obj)[0];
                        const firstObjectValue = obj[firstObjectKey];
                        delete obj[firstObjectKey];
                        const newObj = { [firstObjectValue.toString()]: obj };

                        data.push(newObj);
                    });

                    // const index = ["24", "25", "26", "27"];
                    // const values = [98, "3?", "?4", "5?"];
                    let outputData = ['', '', '', ''];
                    // const strongValues = [
                    //   {
                    //     value: 98,
                    //     date: 24,
                    //     index: 0,
                    //     sub: 3,
                    //     valMinus: -1
                    //   }
                    // ];
                    // const findSingle = [
                    //   {
                    //     value: "3?",
                    //     date: 25,
                    //     index: 1,
                    //     sub: 2
                    //   },
                    //   {
                    //     value: "?4",
                    //     date: 26,
                    //     index: 1,
                    //     sub: 1
                    //   },
                    //   {
                    //     value: "5?",
                    //     date: 27,
                    //     index: 2,
                    //     sub: 0
                    //   }
                    // ]

                    let dataSet = {
                        month: '',
                        index: '',
                        outerObject: ''
                    }
                    let year;
                    let months = [];
                    function firstValue(data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i][strongValues[0].date]) {
                                let key = Object.keys(data[i][strongValues[0].date]).find(key => data[i][strongValues[0].date][key] === strongValues[0].value);
                                if (key) {
                                    months.push(key);
                                }
                            }
                        }
                    }

                    function compareStrings(string1, string2) {
                        string1 = string1.toString();
                        string2 = string2.toString();
                        if (string2.length === 1) {
                            string2 = '0' + string2
                        }
                        if (string1.length !== string2.length) {
                            return false; // If the strings have different lengths, they can't match
                        }

                        for (let i = 0; i < string1.length; i++) {
                            if (string1[i] !== "?" && string1[i] !== string2[i]) {
                                return false; // If a non-question mark character doesn't match, return false
                            }
                        }

                        return true; // All characters match, or are question marks
                    }
                    const rest = [];
                    function restValues(data) {
                        for (let i = 0; i < months.length; i++) {
                            for (let j = 0; j < data.length; j++) {
                                // let index;
                                let value;
                                if (data[j][findSingle[0].date]) {
                                    let index2;
                                    let index3;
                                    if (findSingle[0].index === 1) {
                                        findSingle[1].index = 1;
                                        findSingle[2].index = 2;
                                        strongValues[0].valMinus = -1;
                                    }
                                    else {
                                        strongValues[0].valMinus = strongValues[0].index;
                                    }

                                    let isMatch = compareStrings(findSingle[0].value, data[j][findSingle[0].date][months[i]])
                                    if (isMatch) {
                                        value = data[j][findSingle[0].date][months[i]];
                                        j = parseInt(j);
                                        rest.push(parseInt(j));
                                        let isMatchtwo = compareStrings(findSingle[1].value, data[j + findSingle[1].index][findSingle[1].date][months[i]]);
                                        if (isMatchtwo) {
                                            let isMatchthree = compareStrings(findSingle[2].value, data[j + findSingle[2].index][findSingle[2].date][months[i]])
                                            if (isMatchthree) {
                                                // wirte logic for inxe here 
                                                let isMatchFour = data[j + strongValues[0].valMinus][strongValues[0].date][months[i]]
                                                if (isMatchFour === values[strongValues[0].index]) {
                                                    values[findSingle[0].index] = value
                                                    strongValues.push({
                                                        value: data[j][findSingle[0].date][months[i]],
                                                        date: parseInt(index[findSingle[0].index]),
                                                        index: parseInt(findSingle[0].index),
                                                        sub: 3 - findSingle[0].index
                                                    });

                                                    if (strongValues[1].index < strongValues[0].index) {
                                                        strongValues.reverse();
                                                    }

                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                    function secondValue(data) {
                        console.log("🚀 ~ file: index.html:328 ~ secondValue ~ strongValues:", strongValues)
                        for (let i in months) {
                            for (let j in data) {
                                if (data[j][strongValues[1].date]) {
                                    let value = data[j][strongValues[1].date][months[i]];
                                    if (value === strongValues[1].value) {
                                        //   j = parseInt(j) === 0 ? 1 : parseInt(j);
                                        // let checkIndex;
                                        // if(strongValues[1].index )
                                        if (data[parseInt(j) - strongValues[1].index][strongValues[0].date]) {
                                            //this change must be changed -1
                                            let vlaue2 = data[parseInt(j) - strongValues[1].index][strongValues[0].date][months[i]];

                                            if (vlaue2 === strongValues[0].value) {
                                                dataSet.month = months[i];
                                                let yearIndex = 30 - strongValues[1].date + parseInt(j);
                                                if (Object.keys(data[yearIndex + 1])[0] === "31") {
                                                    year = Object.keys(data[yearIndex - 30])[0];
                                                    outputData[strongValues[1].index] = parseInt(j);
                                                }
                                                else {
                                                    year = Object.keys(data[yearIndex + 1])[0] - 1;
                                                    outputData[strongValues[1].index] = parseInt(j);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                    function removeDuplicates(arr) {
                        return arr.filter((item,
                            index) => arr.indexOf(item) === index);
                    }
                    firstValue(data);
                    months = removeDuplicates(months)
                    restValues(data);
                    secondValue(data);

                    let filledoutputData = [];
                    for (let i = 0; i < outputData.length; i++) {
                        if (outputData[i] === '') {
                            if (outputData[i + 1] !== undefined && outputData[i + 1] !== '') {
                                filledoutputData.push(outputData[i + 1] - 1);
                            }
                            else if (outputData[i + 2] !== undefined && outputData[i + 2] !== '') {
                                filledoutputData.push(outputData[i + 2] - 2);
                            }
                            else if (outputData[i + 3] !== undefined && outputData[i + 3] !== '') {
                                filledoutputData.push(outputData[i + 3] - 3);
                            }
                            else {
                                filledoutputData.push(filledoutputData[i - 1] + 1);
                            }
                        } else {
                            filledoutputData.push(outputData[i]);
                        }
                    }
                    console.log(filledoutputData)
                    for (let k in filledoutputData) {
                        let value = Object.values(data[filledoutputData[k]]);
                        values[k] = value[0][dataSet.month];
                    }

                    for (let i in values) {
                        values[i] = values[i].toString();
                        if (values[i].length === 1) {
                            values[i] = '0' + values[i]
                        }
                    }
                    console.log(values);

                    // document.getElementById("jsonData").innerHTML = values;
                    // Get the <ul> element by its ID
                    document.getElementById("year").innerHTML = `Year: ${year}`;
                    var myList = document.getElementById("outputList");

                    // Iterate through the data and create <li> elements
                    for (var i = 0; i < values.length; i++) {
                        var listItem = document.createElement("li");
                        listItem.textContent = values[i];
                        myList.appendChild(listItem);
                    }
                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });