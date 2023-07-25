var selectedFile;
function validateInputs(input) {
    if (input.value && input.value.length > 2) {
        alert("Only Two Characters are allowed per Input")
    }
}

// window.onerror = function (message, source, line, column, error) {
//     // Display an alert with the error details
//     // alert("An error occurred: " + message + "\n\n" +
//     //       "Source: " + source + "\n" +
//     //       "Line: " + line + "\n" +
//     //       "Column: " + column + "\n" +
//     //       "Error object: " + error);
//     alert("No Data Found Please try again")
//     // Optional: You can also log the error to the console
//     console.error(error);
// };
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
            let dataSetNew = {
                month: '',
                indexStart: '',
                outerObject: ''
            };
            let monthFeb = '';
            let febIndex;
            let febIndexPlus;
            let leapMonth = false;
            let leapMonthName = '';
            let leapMonthStart = '';
            function findNextMonthIndex(dateArray) {
                for (let i = 0; i < dateArray.length; i++) {
                    const currentDate = parseInt(dateArray[i]);
                    const nextIndex = (i + 1) % dateArray.length;
                    const nextDate = parseInt(dateArray[nextIndex]);

                    if (nextDate < currentDate) {
                        return nextIndex;
                    }
                }

                return -1; // If no change to next month is found
            }

            // Example usage
            const nextMonthIndex = findNextMonthIndex(index);
            if (nextMonthIndex !== -1) {
                console.log("Next month starts at index:", nextMonthIndex);
                dataSetNew.indexStart = nextMonthIndex;
            } else {
                console.log("No change to next month found in the array.");
            }
            const values = inputValues.map(function (str) {
                return /^\d+$/.test(str) ? parseInt(str, 10) : str;
            });
            const strongValues = [];
            let leap = ['1', '2', '3']
            const findSingle = [];
            let strongValuesOld = [];
            let nextYear = false;
            for (let i in values) {
                if (index[parseInt(i) + 1] === '1' && index[i] === '29') {
                    leapMonth = true;
                    leapMonthStart = parseInt(i);
                }
                else if (index[parseInt(i) + 1] - index[i] < 0 && (30 - index[i] > 1 && 30 - index[i] <= 3)) {
                    monthFeb = 'Feb'
                    febIndexPlus = 30 - index[i] + 1;
                    febIndex = parseInt(i);
                }
                else if (index[parseInt(i) + 1] - index[i] < 0 && index[parseInt(i) + 1] - index[i] && index[parseInt(i) + 1] - index[i]) {
                    if (index[parseInt(i) + 1] - index[i] === -29) {
                        nextYear = true;
                        leapMonth = true;
                    }
                }

                if (typeof values[i] !== "string" || values[i] === 'xx' || values[i] === 'Xx' || values[i] === 'XX') {
                    console.log("insdie")
                    let valMinus = 1;
                    if (parseInt(i) < 1) {
                        valMinus = -1;
                    }
                    if (leap.includes(index[i])) {
                        leapMonth = true;
                    }
                    strongValues.push({
                        value: values[i],
                        date: index[i],
                        index: parseInt(i),
                        sub: 4 - (parseInt(i) + 1),
                        valMinus: valMinus,
                        leapMonth: leapMonth
                    })

                    strongValuesOld.push({
                        value: values[i],
                        date: index[i],
                        index: parseInt(i),
                        sub: 4 - (parseInt(i) + 1),
                        valMinus: valMinus,
                    })
                }
            }
            for (let i in values) {
                if (typeof values[i] === "string") {
                    let valMinus = 1;
                    let leapMonth = false;
                    if (parseInt(i) < 1) {
                        valMinus = -1;
                    }
                    if (leap.includes(index[i])) {
                        leapMonth = true;
                    }
                    findSingle.push({
                        value: values[i],
                        date: index[i],
                        // index: parseInt(i) === 3 ? 2 : parseInt(i) - parseInt(i - 1),
                        index: parseInt(i),
                        sub: 4 - (parseInt(i) + 1),
                        indexCheck: parseInt(i),
                        leapMonth: leapMonth
                    })
                }
            }

            console.log("🚀 ~ file: index.html:116 ~ strongValues:", strongValues, findSingle, values, index, leapMonth, leapMonthStart, nextYear);

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
                    let data = [];
                    jsonObject = JSON.parse(jsonObject);

                    const monthsArray = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
                    let outputData = [];
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
                    let firstDataYears = []
                    let newData = [];
                    let newDataIterations = [];
                    function firstValue(data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i][strongValues[0].date]) {
                                let key = Object.keys(data[i][strongValues[0].date]).find(key => data[i][strongValues[0].date][key] === strongValues[0].value);
                                if (key) {
                                    // firstDataYears.push(Object.keys(data[i - parseInt(strongValues[0].date)])[0]);
                                    newDataIterations.push({ start: parseInt(i) - parseInt(strongValues[0].date), end: parseInt(i) + 30 });
                                    months.push(key);
                                }
                            }
                        }

                        // newDataIterations.forEach((it) => {
                        //     for (let z = it.start; z <= it.end; z++) {
                        //         newData.push(data[z])
                        //     }
                        // });
                        // data = [];
                        // data = newData
                    }

                    function compareStrings(string1, string2) {
                        if (string1 !== undefined && string2 !== undefined) {
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
                        } else {
                            return false;
                        }
                    }
                    const rest = [];
                    let minusValues = {
                        "1": 28,// 28 if index one has value
                        "2": 28,
                        "3": 27
                    }
                    let minusValuesForTwo = {
                        "1": 29,// 28 if index one has value
                        "2": 28,
                        "3": 28
                    }
                    let minusValuesForFour = {
                        "1": 27,// 28 if index one has value
                        "2": 28,
                        "3": 27
                    }
                    let dataNew = [{}, {}, {}, {}];
                    let outputIndexes = [];
                    let arr1 = [];
                    let arr2 = [];
                    let arr3 = [];
                    let arr4 = [];
                    let afterLeap = ['1', '2', '3'];
                    function extraWork(newData) {
                        console.log("new data", months);
                        for (let i = 0; i < months.length; i++) {
                            for (let j = 0; j < newData.length; j++) {
                                let monthOne = months[i];
                                let monthTwo = months[i];
                                let monthThree = months[i];
                                let monthFour = months[i];
                                let rangeAfter = ['1', '2', '3']
                                let arr = [];
                                if (newData[j] !== undefined) {
                                    if (newData[j][strongValues[0].date]) {
                                        if (leapMonth) {
                                            if (strongValues[0].indexCheck > leapMonthStart) {
                                                monthsArray.map((mo, index) => {
                                                    if (mo === months[i]) {
                                                        monthFour = monthsArray[index + 1];
                                                    }
                                                });
                                            }
                                        }
                                        let isMatch = newData[j][strongValues[0].date][monthFour];
                                        if (isMatch === values[strongValues[0].index]) {
                                            let startindex = parseInt(j) - parseInt(strongValues[0].date);
                                            startindex = startindex === undefined ? parseInt(j) - parseInt(strongValues[0].date) + 1 : startindex;
                                            let endIndex = parseInt(j) + (30 - parseInt(strongValues[0].date));
                                            if(leapMonth){
                                                startindex = startindex - 30;
                                                endIndex = endIndex + 30
                                            }
                                            console.log("indexed-------", startindex, endIndex)
                                            for (let z = startindex; z < endIndex; z++) {
                                                if (newData[z] !== undefined) {
                                                    if (newData[z][findSingle[0].date]) {
                                                        if (leapMonth || monthFeb === 'Feb') {
                                                            if (findSingle[0].leapMonth && !afterLeap.includes(strongValues[0].date)) {
                                                                monthsArray.map((mo, index) => {
                                                                    if (mo === months[i]) {
                                                                        monthOne = monthsArray[index + 1];
                                                                        if(monthOne === undefined){
                                                                            monthOne = 'Jan';
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else if (!findSingle[0].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                monthsArray.map((mo, index) => {
                                                                    if (mo === months[i]) {
                                                                        monthOne = monthsArray[index - 1];
                                                                        if(monthOne === undefined){
                                                                            monthOne = 'Dec';
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        let isMatchOne = compareStrings(findSingle[0].value, newData[z][findSingle[0].date][monthOne]);
                                                        if (isMatchOne) {
                                                            for (let k = startindex; k < endIndex; k++) {
                                                                if (newData[k] !== undefined) {
                                                                    if (newData[k][findSingle[1].date]) {
                                                                        if (leapMonth || monthFeb === 'Feb') {
                                                                            if (findSingle[1].leapMonth && !afterLeap.includes(strongValues[0].date)) {
                                                                                monthsArray.map((mo, index) => {
                                                                                    if (mo === months[i]) {
                                                                                        monthTwo = monthsArray[index + 1];
                                                                                        if(monthTwo === undefined){
                                                                                            monthTwo = 'Jan';
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else if (!findSingle[1].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                                monthsArray.map((mo, index) => {
                                                                                    if (mo === months[i]) {
                                                                                        monthTwo = monthsArray[index - 1];
                                                                                        if(monthTwo === undefined){
                                                                                            monthTwo = 'Dec';
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                        let isMatchTwo = compareStrings(findSingle[1].value, newData[k][findSingle[1].date][monthTwo]);
                                                                        if (isMatchTwo) {
                                                                            for (let m = startindex; m < endIndex; m++) {
                                                                                if (newData[m] !== undefined  && outputData.length !== 4) {
                                                                                    if (newData[m][findSingle[2].date]) {
                                                                                        if (leapMonth || monthFeb === 'Feb') {
                                                                                            if (findSingle[2].leapMonth && !afterLeap.includes(strongValues[0].date)) {
                                                                                                monthsArray.map((mo, index) => {
                                                                                                    if (mo === months[i]) {
                                                                                                        monthThree = monthsArray[index + 1];
                                                                                                        if(monthThree === undefined){
                                                                                                            monthThree = 'Jan';
                                                                                                        }
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (!findSingle[2].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                                                monthsArray.map((mo, index) => {
                                                                                                    if (mo === months[i]) {
                                                                                                        monthThree = monthsArray[index - 1];
                                                                                                        if(monthThree === undefined){
                                                                                                            monthThree = 'Dec';
                                                                                                        }
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }

                                                                                        let isMatchThree = compareStrings(findSingle[2].value, newData[m][findSingle[2].date][monthThree]);
                                                                                        if (isMatchThree) {
                                                                                            strongValues.push({
                                                                                                value: newData[z][findSingle[0].date][monthOne],
                                                                                                date: parseInt(index[findSingle[0].index]),
                                                                                                index: parseInt(findSingle[0].index),
                                                                                                sub: 3 - findSingle[0].index,
                                                                                                month: monthOne,
                                                                                            });
                                                                                            outputData[findSingle[0].indexCheck] = {
                                                                                                value: newData[z][findSingle[0].date][monthOne],
                                                                                                date: parseInt(index[findSingle[0].index]),
                                                                                                index: z,
                                                                                                month: monthOne
                                                                                            };
                                                                                            outputData[strongValues[0].index] = {
                                                                                                value: isMatch,
                                                                                                date: parseInt(index[strongValues[0].index]),
                                                                                                index: j,
                                                                                                month: monthFour
                                                                                            };
                                                                                            outputData[findSingle[1].indexCheck] = {
                                                                                                value: isMatch,
                                                                                                date: parseInt(index[strongValues[0].index]),
                                                                                                index: k,
                                                                                                month: monthTwo
                                                                                            };
                                                                                            outputData[findSingle[2].indexCheck] = {
                                                                                                value: isMatch,
                                                                                                date: parseInt(index[strongValues[0].index]),
                                                                                                index: m,
                                                                                                month: monthThree
                                                                                            };
                                                                                            // if (strongValues[1].index < strongValues[0].index) {
                                                                                            //     strongValues.reverse();
                                                                                            // }
                                                                                            // let yearObject;
                                                                                            // findSingle.map((f) => {
                                                                                            //     if(f.indexCheck === 0)
                                                                                            //     {
                                                                                            //         yearObject = f;
                                                                                            //     }
                                                                                            // });
                                                                                            // strongValues.map((f) => {
                                                                                            //     if(f.index === 0)
                                                                                            //     {
                                                                                            //         yearObject = f;
                                                                                            //     }
                                                                                            // })
                                                                                            console.log("data------------",outputData)
                                                                                            let yearIndex = 30 - strongValues[1].date + parseInt(z);
                                                                                            if (Object.keys(newData[yearIndex + 1])[0] === "31") {
                                                                                                year = Object.keys(newData[yearIndex - 30])[0];
                                                                                            }
                                                                                            else {
                                                                                                year = Object.keys(newData[yearIndex + 1])[0] - 1;
                                                                                            }
                                                                                            console.log("true--------", z, k, j, m)
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            // outputIndexes.push(j);
                                            // arr4.push(j);
                                        }
                                    }
                                }

                            }
                        }

                        // console.log("outputindexes0", arr1, arr2, arr3, arr4);
                    }
                    function restValues(data) {
                        for (let i = 0; i < months.length; i++) {
                            for (let j = 0; j < data.length; j++) {
                                // let index;
                                let value;
                                if (strongValues.length < 2) {

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
                                        let monthOne = months[i];

                                        let matchOneIndex = parseInt(j);
                                        let isMatch = compareStrings(findSingle[0].value, data[j][findSingle[0].date][monthOne])
                                        if (isMatch) {
                                            value = data[j][findSingle[0].date][months[i]];
                                            j = parseInt(j);
                                            rest.push(parseInt(j));
                                            let monthTwo = months[i];
                                            let monthTwoDate = findSingle[1].date - findSingle[0].date;
                                            let nextMonthIndex;

                                            let matchTwoIndex = parseInt(j) + findSingle[1].index;
                                            let isMatchtwo = compareStrings(findSingle[1].value, data[j + findSingle[1].index][findSingle[1].date][monthTwo]);
                                            if (isMatchtwo) {
                                                let monthThree = months[i];
                                                let matchThreeIndex = parseInt(j) + findSingle[2].index;
                                                let isMatchthree = compareStrings(findSingle[2].value, data[j + findSingle[2].index][findSingle[2].date][monthThree])
                                                if (isMatchthree) {
                                                    console.log("🚀 ~ file: sortOne.js:404 ~ restValues ~ isMatchthree:", isMatchthree)
                                                    // wirte logic for inxe here 
                                                    let monthFour = months[i]
                                                    let dateArray = ['1', '2', '3']

                                                    let matchFourIndex = parseInt(j) + strongValues[0].valMinus;
                                                    let isMatchFour = data[j + strongValues[0].valMinus][strongValues[0].date][monthFour]
                                                    if (isMatchFour === values[strongValues[0].index]) {
                                                        values[findSingle[0].index] = value
                                                        strongValues[0].month = monthThree;
                                                        let months = [monthOne, monthFour, monthTwo, monthThree];
                                                        if (monthFeb === 'Feb') {
                                                            for (let i = 0; i < months.length; i++) {
                                                                let foundMar = false;
                                                                if (months[i] === 'Apr') {
                                                                    foundMar = true;
                                                                }

                                                                if (foundMar) {
                                                                    months[i] = 'Feb';
                                                                }
                                                            }
                                                        }
                                                        console.log("months", months);
                                                        strongValues.push({
                                                            value: data[j][findSingle[0].date][monthOne],
                                                            date: parseInt(index[findSingle[0].index]),
                                                            index: parseInt(findSingle[0].index),
                                                            sub: 3 - findSingle[0].index,
                                                            month: monthOne,
                                                        });
                                                        outputData[findSingle[0].indexCheck] = {
                                                            value: data[j][findSingle[0].date][monthOne],
                                                            date: parseInt(index[findSingle[0].index]),
                                                            index: matchOneIndex,
                                                            month: months[0]
                                                        };
                                                        outputData[strongValues[0].index] = {
                                                            value: isMatchFour,
                                                            date: parseInt(index[strongValues[0].index]),
                                                            index: matchFourIndex,
                                                            month: months[1]
                                                        };
                                                        outputData[findSingle[1].indexCheck] = {
                                                            value: isMatchFour,
                                                            date: parseInt(index[strongValues[0].index]),
                                                            index: matchTwoIndex,
                                                            month: months[2]
                                                        };
                                                        outputData[findSingle[2].indexCheck] = {
                                                            value: isMatchFour,
                                                            date: parseInt(index[strongValues[0].index]),
                                                            index: matchThreeIndex,
                                                            month: months[3]
                                                        };
                                                        // if (strongValues[1].index < strongValues[0].index) {
                                                        //     strongValues.reverse();
                                                        // }
                                                        let yearIndex = 30 - strongValues[1].date + parseInt(j);
                                                        if (Object.keys(data[yearIndex + 1])[0] === "31") {
                                                            year = Object.keys(data[yearIndex - 30])[0];
                                                        }
                                                        else {
                                                            year = Object.keys(data[yearIndex + 1])[0] - 1;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                    // function secondValue(data) {
                    //     console.log("🚀 ~ file: index.html:328 ~ secondValue ~ strongValues:", strongValues, strongValuesOld);
                    //     for (let i in months) {
                    //         for (let j in data) {
                    //             if (data[j][strongValues[1].date]) {
                    //                 let value = data[j][strongValues[1].date][strongValues[1].month];
                    //                 if (value === strongValues[1].value) {
                    //                     let minusValue = strongValues[1].index;
                    //                     if (dataSetNew.indexStart === 3 && strongValuesOld[0].index === 3 && dataSetNew.indexStart !== 0) {
                    //                         minusValue = -27;
                    //                     }
                    //                     if (strongValues[1].index === 2 && strongValues[1].index >= dataSetNew.indexStart && dataSetNew.indexStart !== 0) {
                    //                         minusValue = parseInt(strongValues[0].date) - 1;
                    //                         minusValue = -minusValue
                    //                     }
                    //                     if (strongValues[1].index === 3 && strongValues[1].index >= dataSetNew.indexStart && dataSetNew.indexStart !== 0) {
                    //                         minusValue = parseInt(strongValues[0].date) - 2;
                    //                         minusValue = -minusValue
                    //                     }
                    //                     if (strongValuesOld[0].index === 0 && dataSetNew.indexStart !== 0 && strongValues[0].index >= dataSetNew.indexStart) {
                    //                         minusValue = parseInt(strongValues[0].date) - 1;
                    //                         minusValue = -minusValue
                    //                     }

                    //                     if (data[parseInt(j) - minusValue][strongValues[0].date]) {
                    //                         //this change must be changed -1
                    //                         let vlaue2 = data[parseInt(j) - minusValue][strongValues[0].date][strongValues[0].month];

                    //                         if (vlaue2 === strongValues[0].value) {
                    //                             // if (outputData[strongValues[1].index] !== '') {
                    //                             dataSet.month = strongValues[0].month;

                    //                             let yearIndex = 30 - strongValues[1].date + parseInt(j);
                    //                             if (Object.keys(data[yearIndex + 1])[0] === "31") {
                    //                                 year = Object.keys(data[yearIndex - 30])[0];
                    //                                 outputData[strongValues[1].index] = parseInt(j);
                    //                             }
                    //                             else {
                    //                                 year = Object.keys(data[yearIndex + 1])[0] - 1;
                    //                                 outputData[strongValues[1].index] = parseInt(j);
                    //                             }
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }

                    function removeDuplicates(arr) {
                        return arr.filter((item,
                            index) => arr.indexOf(item) === index);
                    }
                    firstValue(data);
                    months = removeDuplicates(months)
                    if (monthFeb === 'Feb' || leapMonth || nextYear) {
                        extraWork(data)
                        // data = newData
                    }
                    else {
                        restValues(data);
                    }
                    // secondValue(data);
                    console.log(outputData)
                    // let filledoutputData = [];
                    // for (let i = 0; i < outputData.length; i++) {
                    //     if (outputData[i] === '') {
                    //         if (outputData[i + 1] !== undefined && outputData[i + 1] !== '') {
                    //             filledoutputData.push(outputData[i + 1] - 1);
                    //         }
                    //         else if (outputData[i + 2] !== undefined && outputData[i + 2] !== '') {
                    //             filledoutputData.push(outputData[i + 2] - 2);
                    //         }
                    //         else if (outputData[i + 3] !== undefined && outputData[i + 3] !== '') {
                    //             filledoutputData.push(outputData[i + 3] - 3);
                    //         }
                    //         else {
                    //             filledoutputData.push(filledoutputData[i - 1] + 1);
                    //         }
                    //     } else {
                    //         filledoutputData.push(outputData[i]);
                    //     }
                    // }
                    // console.log(filledoutputData)
                    // let prevMonthIndex;
                    // let minusValuesTwo = {
                    //     "1": 30,
                    //     "2": 30,
                    //     "3": 30
                    // }

                    // let minusValuesThree = {
                    //     "1": 29,
                    //     "2": 29,
                    //     "3": 29
                    // }


                    // for (let j in index) {
                    //     let minus;
                    //     let minusIndex;
                    //     if (prevMonthIndex) {
                    //         minus = parseInt(index[prevMonthIndex]) - parseInt(index[j]);
                    //     }
                    //     else {
                    //         minus = parseInt(index[parseInt(j) - 1]) - parseInt(index[j]);
                    //         if (minus > 2) {
                    //             prevMonthIndex = parseInt(j) - 1;
                    //             dataSetNew.indexStart = parseInt(j);
                    //         }
                    //     }
                    //     if (minus > 2) {
                    //         monthsArray.map((mo, index) => {
                    //             if (mo === dataSet.month) {
                    //                 dataSetNew.month = monthsArray[index + 1];
                    //             }
                    //         })
                    //         if (dataSetNew.indexStart === 2) {
                    //             minusIndex = minusValuesTwo[index[j]];
                    //         }
                    //         else if (dataSetNew.indexStart === 3) {
                    //             minusIndex = minusValuesThree[index[j]];
                    //         }

                    //         //check for this line in anothjer data
                    //         // if (strongValuesOld[0].index >= dataSetNew.indexStart) {
                    //             console.log("inside this");
                    //             filledoutputData[j] = filledoutputData[j] - minusIndex;
                    //         // }
                    //     }
                    // }
                    // //to update value for last data
                    // if (dataSetNew.indexStart === 3 && strongValuesOld[0].index === 3) {
                    //     for (let u in filledoutputData) {
                    //         if (parseInt(u) < 3) {
                    //             filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 1;
                    //         }
                    //     }
                    // }
                    // if (dataSetNew.indexStart === 2) {
                    //     if (strongValuesOld[0].index === 2) {
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 2) {
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 2;
                    //             }
                    //         }
                    //     }
                    //     if (strongValuesOld[0].index === 3) {
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 2) {
                    //                 console.log("sindie one", filledoutputData[u])
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 2
                    //                 console.log("sindie one", filledoutputData[u])
                    //             }
                    //         }
                    //     }
                    // }
                    // if (dataSetNew.indexStart === 1) {
                    //     if (strongValuesOld[0].index === 0) {
                    //         console.log("Strong vaue cjecl");
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 1) {
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 3;
                    //             }
                    //         }
                    //     }
                    //     if (strongValuesOld[0].index === 1) {
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 1) {
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 3;
                    //             }
                    //         }
                    //     }
                    //     if (strongValuesOld[0].index === 2) {
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 1) {
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 3
                    //             }
                    //         }
                    //     }
                    //     if (strongValuesOld[0].index === 3) {
                    //         for (let u in filledoutputData) {
                    //             if (parseInt(u) < 1) {
                    //                 filledoutputData[u] = filledoutputData[3] + parseInt(index[u]) - 3
                    //             }
                    //         }
                    //     }
                    // }
                    // console.log(filledoutputData)
                    // for (let k in filledoutputData) {
                    //     let month;
                    //     if (dataSetNew.indexStart && dataSetNew.indexStart !== 0) {
                    //         if (parseInt(k) < dataSetNew.indexStart) {
                    //             month = dataSet.month;
                    //         }
                    //         else {
                    //             month = dataSetNew.month;
                    //         }
                    //     }
                    //     else {
                    //         month = dataSet.month;
                    //     }

                    //     let value = Object.values(data[filledoutputData[k]]);
                    //     values[k] = value[0][month];
                    // }
                    outputData.forEach((d, i) => {
                        let value = Object.values(data[d.index]);
                        values[i] = value[0][d.month];
                    })
                    console.log("values", values)
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
        else {
            alert("Please Upload File to run")
        }
    });