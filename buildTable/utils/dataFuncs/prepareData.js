const startFunc = ({ inData, inShowSerialNo }) => {
    let finalData = Array.isArray(inData) ? inData : [inData];

    if (inShowSerialNo) {
        finalData = finalData.map((row, index) => {
            return { ...row, $serial: index + 1 };
        });
    }

    return finalData;
};


export default startFunc