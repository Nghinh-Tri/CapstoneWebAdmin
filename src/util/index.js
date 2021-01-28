export const convertList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({label: element.name, value: element.id})
    });
    return result;
}