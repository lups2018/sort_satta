
$("#appendTables").on("click", function () {
    const dateOne = $(".date-1").val();
    const dateTwo = $(".date-2").val();
    const dateThree = $(".date-3").val();
    const dateFour = $(".date-4").val();

    const valOne = $(".value-1").val();
    const valTwo = $(".value-2").val();
    const valThree = $(".value-3").val();
    const valFour = $(".value-4").val();

    const valOneRev = valOne.split('').reverse().join('');
    const valTwoRev = valTwo.split('').reverse().join('');
    const valThreeRev = valThree.split('').reverse().join('');
    const valFourRev = valFour.split('').reverse().join('');
    var html = `
    <b class="set-name">First Set</b>
    <table class="table-{tableClass}">
      <tr>
        <td>
          <input onchange="validateInputs(this)" readonly class="common date-1" type="text" placeholder="Date One" value="" >
          <input onchange="validateInputs(this)" readonly class="common value-1" type="text" placeholder="Value One" value="" >
        </td>
      </tr>
      <tr>
        <td>
          <input onchange="validateInputs(this)" readonly class="common date-2" type="text" placeholder="Date Two" value="">
          <input onchange="validateInputs(this)" readonly class="common value-2" type="text" placeholder="Value Two" value="">
        </td>
      </tr>
      <tr>
        <td>
          <input onchange="validateInputs(this)" readonly class="common date-3" type="text" placeholder="Date Three" value="">
          <input onchange="validateInputs(this)" readonly class="common value-3" type="text" placeholder="Value Three" value="">
        </td>
      </tr>
      <tr>
        <td>
          <input onchange="validateInputs(this)" readonly class="common date-4" type="text" placeholder="Date Four" value="">
          <input onchange="validateInputs(this)" readonly class="common value-4" type="text" placeholder="Value Four" value="">
        </td>
      </tr>
    </table>
    <div style="margin-top: 20px;">
    <b class="no-data"></b>
    <b><span class="year"></span></b>
    <b><ul style="margin-right: 30px;" class="outputList"></ul></b>
    </div>
    
    `;


    var $div = $('#yourDiv'); // Replace 'yourDiv' with the ID or class of your target div element

    for (var i = 2; i <= 8; i++) {
        let tableClass = i;
        var $html = $(html.replace('{tableClass}', tableClass));
        $($html[4]).addClass('result-' + i)
        $($html[0]).text('Set ' + parseInt(i));
        $div.append($html);
    }
    $(`.date-1`).val(dateOne)
    $(`.date-2`).val(dateTwo)
    $(`.date-3`).val(dateThree)
    $(`.date-4`).val(dateFour)
    for (var j = 2; j <= 8; j++) {

        let tableClass = j;
        $(`.table-${tableClass} .value-1`).val("54")
        switch (j) {
            case 2:
                $(`.table-${tableClass} .value-1`).val(valOneRev)
                $(`.table-${tableClass} .value-2`).val(valTwo)
                $(`.table-${tableClass} .value-3`).val(valThree)
                $(`.table-${tableClass} .value-4`).val(valFour)
                break;
            case 3:
                $(`.table-${tableClass} .value-1`).val(valOne)
                $(`.table-${tableClass} .value-2`).val(valTwo)
                $(`.table-${tableClass} .value-3`).val(valFour)
                $(`.table-${tableClass} .value-4`).val(valThree)
                break;
            case 4:
                $(`.table-${tableClass} .value-1`).val(valOneRev)
                $(`.table-${tableClass} .value-2`).val(valTwo)
                $(`.table-${tableClass} .value-3`).val(valFour)
                $(`.table-${tableClass} .value-4`).val(valThree)
                break;
            case 5:
                $(`.table-${tableClass} .value-1`).val(valOneRev)
                $(`.table-${tableClass} .value-2`).val(valTwoRev)
                $(`.table-${tableClass} .value-3`).val(valThreeRev)
                $(`.table-${tableClass} .value-4`).val(valFourRev)
                break;
            case 6:
                $(`.table-${tableClass} .value-1`).val(valOne)
                $(`.table-${tableClass} .value-2`).val(valTwoRev)
                $(`.table-${tableClass} .value-3`).val(valThreeRev)
                $(`.table-${tableClass} .value-4`).val(valFourRev)
                break;
            case 7:
                $(`.table-${tableClass} .value-1`).val(valOneRev)
                $(`.table-${tableClass} .value-2`).val(valTwoRev)
                $(`.table-${tableClass} .value-3`).val(valFourRev)
                $(`.table-${tableClass} .value-4`).val(valThreeRev)
                break;
            case 8:
                $(`.table-${tableClass} .value-1`).val(valOne)
                $(`.table-${tableClass} .value-2`).val(valTwoRev)
                $(`.table-${tableClass} .value-3`).val(valFourRev)
                $(`.table-${tableClass} .value-4`).val(valThreeRev)
                break;
            default:
                break;
        }
    }
    $("#appendTables").css('display', 'none');
    $("#uploadExcel").css('display', 'inline-block');
    $("#reset").css('display', 'inline-block');
})
$(document).ready(function () {

});

$("#reset").on("click", function () {
    $('#yourDiv').empty();
    $("#uploadExcel").css('display', 'none');
    $("#reset").css('display', 'none');
    $("#appendTables").css('display', 'inline-block');
    $(".year").html("");
    $(".outputList").html("");
});

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
            $("#uploadExcel").css('display', 'none');
            $("#reset").css('display', 'none');
            document.getElementById('loader').style.display = 'inline-block';
            $(".year").html("");
            $(".outputList").html("");
            for (let loop = 1; loop <= 8; loop++) {
                console.log("chec", loop)
                $("#outputList").empty();
                const table = "table-" + loop;
                const index = [$(".date-1").val(), $(".date-2").val(), $(".date-3").val(), $(".date-4").val()];
                const inputValues = [$(`.${table} .value-1`).val(), $(`.${table} .value-2`).val(), $(`.${table} .value-3`).val(), $(`.${table} .value-4`).val()];

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
                        let valMinus = 1;
                        if (parseInt(i) < 1) {
                            valMinus = -1;
                        }
                        // if (leap.includes(index[i])) {
                        //     leapMonth = true;
                        // }
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

                        let outputData = [];
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
                                        newDataIterations.push({ start: parseInt(i) - parseInt(strongValues[0].date), end: parseInt(i) + 30 });
                                        months.push(key);
                                    }
                                }
                            }
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
                                                if (leapMonth) {
                                                    startindex = startindex - 30;
                                                    endIndex = endIndex + 30
                                                }
                                                for (let z = startindex; z < endIndex; z++) {
                                                    if (newData[z] !== undefined) {
                                                        if (newData[z][findSingle[0].date]) {
                                                            if (leapMonth || monthFeb === 'Feb') {
                                                                if (findSingle[0].leapMonth && !afterLeap.includes(strongValues[0].date)) {
                                                                    monthsArray.map((mo, index) => {
                                                                        if (mo === months[i]) {
                                                                            monthOne = monthsArray[index + 1];
                                                                            if (monthOne === undefined) {
                                                                                monthOne = 'Jan';
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                else if (!findSingle[0].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                    monthsArray.map((mo, index) => {
                                                                        if (mo === months[i]) {
                                                                            monthOne = monthsArray[index - 1];
                                                                            if (monthOne === undefined) {
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
                                                                                            if (monthTwo === undefined) {
                                                                                                monthTwo = 'Jan';
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else if (!findSingle[1].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                                    monthsArray.map((mo, index) => {
                                                                                        if (mo === months[i]) {
                                                                                            monthTwo = monthsArray[index - 1];
                                                                                            if (monthTwo === undefined) {
                                                                                                monthTwo = 'Dec';
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                            let isMatchTwo = compareStrings(findSingle[1].value, newData[k][findSingle[1].date][monthTwo]);
                                                                            if (isMatchTwo) {
                                                                                for (let m = startindex; m < endIndex; m++) {
                                                                                    if (newData[m] !== undefined && outputData.length !== 4) {
                                                                                        if (newData[m][findSingle[2].date]) {
                                                                                            if (leapMonth || monthFeb === 'Feb') {
                                                                                                if (findSingle[2].leapMonth && !afterLeap.includes(strongValues[0].date)) {
                                                                                                    monthsArray.map((mo, index) => {
                                                                                                        if (mo === months[i]) {
                                                                                                            monthThree = monthsArray[index + 1];
                                                                                                            if (monthThree === undefined) {
                                                                                                                monthThree = 'Jan';
                                                                                                            }
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                else if (!findSingle[2].leapMonth && afterLeap.includes(strongValues[0].date)) {
                                                                                                    monthsArray.map((mo, index) => {
                                                                                                        if (mo === months[i]) {
                                                                                                            monthThree = monthsArray[index - 1];
                                                                                                            if (monthThree === undefined) {
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

                                                                                                let yearIndex = 30 - strongValues[1].date + parseInt(z);
                                                                                                if (Object.keys(newData[yearIndex + 1])[0] === "31") {
                                                                                                    year = Object.keys(newData[yearIndex - 30])[0];
                                                                                                }
                                                                                                else {
                                                                                                    year = Object.keys(newData[yearIndex + 1])[0] - 1;
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
                                                }
                                            }
                                        }
                                    }

                                }
                            }
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
                        if (outputData.length !== 0) {
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
                            const output = `result-${loop}`
                            // Get the <ul> element by its ID
                            $(`.${output} .year`).html(`Year: ${year}`)
                            const $ulElement = $(`.${output} .outputList`)

                            // Iterate through the data and create <li> elements
                            for (var i = 0; i < values.length; i++) {
                                const $liElement = $("<li>").text(values[i]);
                                $ulElement.append($liElement);
                            }
                        }
                        else {
                            const output = `result-${loop}`
                            $(`.${output} .no-data`).html("No Data Found");
                        }
                        setTimeout(function () {
                            // Your last line of code
                            // ...

                            // Hide the loader when the operation is completed
                            document.getElementById('loader').style.display = 'none';
                            $("#uploadExcel").css('display', 'inline-block');
                            $("#reset").css('display', 'inline-block');
                        }, 3000);
                       
                    });
                };
                fileReader.readAsBinaryString(selectedFile);
            }
        }
        else {
            alert("Please Upload File to run")
        }
    });
