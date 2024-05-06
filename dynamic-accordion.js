const DATA_TXT_FILE = "diseases.txt";
let dataMap = new Map();

const ELEMENT_BUTTON = "button";
const ELEMENT_DIV = "div";
const ELEMENT_H2 = "h2";

const VAL_BUTTON = "button";
const VAL_COLLAPSE = "collapse";
const VAL_FALSE = "false";
const VAL_ACC = "accordion";
const VAL_CLASS_ACC_PARENT_BTN = "btn btn-primary collapsed m-2";
const VAL_CLASS_ACC_CHILD_BTN = "accordion-button";
const VAL_CLASS_ACC_DIV = "accordion-collapse collapse";
const VAL_CLASS_ACC_ITEM = "accordion-item";
const VAL_CLASS_ACC_BODY = "accordion-body";
const VAL_CLASS_ACC_HEADER = "accordion-header";
const VAL_CLASS_ACC = "accordion";
const VAL_CHILD = "Child";

const ATTRIBUTE_ID = "id";
const ATTRIBUTE_TYPE = "type";
const ATTRIBUTE_CLASS = "class";
const ATTRIBUTE_DATA_BS_TOGGLE = "data-bs-toggle";
const ATTRIBUTE_DATA_BS_TARGET = "data-bs-target";
const ATTRIBUTE_DATA_BS_PARENT = "data-bs-parent";
const ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";
const ATTRIBUTE_ARIA_CONTROLS = "aria-controls";

const ID_ACCORDION_BUTTONS = "accordion-buttons";
const ID_ACCORDION_PARENT = "accordion-parent";

getLinesArrayFromTxtFile(DATA_TXT_FILE)
    .then(dataLines => {
        if (dataLines) dataLines.forEach(buildAccordion);
    });

function buildAccordion(dataInput) {
    data = dataInput.split(COLON);

    if (dataMap.has(data[0])) {
        dataMap.get(data[0]).val++;
    } else {
        dataMap.set(data[0], 1);
        document.getElementById(ID_ACCORDION_BUTTONS).appendChild(getAccordionButton(data[0], null));
        document.getElementById(ID_ACCORDION_PARENT).appendChild(getAccordionItem(data[0], null, null));
    }

   document.getElementById(getAccordionId(data[0], data[1])).appendChild(getAccordionItem(data[0], data[1], data[2]));
}

function getAccordionItem(parentText, childText, childTextDesc) {
    let val = getAccordionItemDiv();
    if (childText) val.appendChild(getAccordionHeader(parentText, childText));
    val.appendChild(getAccordionCollapse(parentText, childText, childTextDesc));
    return val;
}

function getAccordionParentDiv(parentText) {
    let val = document.createElement(ELEMENT_DIV);
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_ACC);
    val.setAttribute(ATTRIBUTE_ID, getAccordionId(parentText, "placeHolder"));
    return val;
}

function getAccordionCollapse(parentText, childText, childTextDesc) {
    let val = document.createElement(ELEMENT_DIV);
    val.setAttribute(ATTRIBUTE_ID, getAccordionCollapseId(parentText, childText));
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_ACC_DIV);
    val.setAttribute(ATTRIBUTE_DATA_BS_PARENT, HASH + getAccordionId(parentText, childText));
    val.appendChild(getAccordionBody(parentText, childText, childTextDesc));
    return val;
}

function getAccordionButton(parentText, childText) {
    let val = document.createElement(ELEMENT_BUTTON);
    val.setAttribute(ATTRIBUTE_TYPE, VAL_BUTTON);
    val.setAttribute(ATTRIBUTE_DATA_BS_TOGGLE, VAL_COLLAPSE);
    val.setAttribute(ATTRIBUTE_DATA_BS_TARGET, HASH + getAccordionCollapseId(parentText, childText));
    val.setAttribute(ATTRIBUTE_ARIA_CONTROLS, getAccordionCollapseId(parentText, childText));
    val.setAttribute(ATTRIBUTE_ARIA_EXPANDED, VAL_FALSE);
    val.setAttribute(ATTRIBUTE_CLASS, getAccordionBtnClass(parentText, childText));
    if (childText) val.innerText = childText;
    else val.innerText = parentText;
    return val;
}

function getAccordionHeader(parentText, childText) {
    let val = document.createElement(ELEMENT_H2);
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_ACC_HEADER);
    val.appendChild(getAccordionButton(parentText, childText));
    return val;
}

function getAccordionItemDiv() {
    let val = document.createElement(ELEMENT_DIV);
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_ACC_ITEM);
    return val;
}

function getAccordionBody(parentText, childText, childTextDesc) {
    let val = document.createElement(ELEMENT_DIV);
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_ACC_BODY);
    if (childText) val.innerText = childTextDesc;
    else val.appendChild(getAccordionParentDiv(parentText));
    return val;
}

function getAccordionCollapseId(parentText, childText) {
    if (childText) return VAL_COLLAPSE + parentText + childText;
    else return VAL_COLLAPSE + parentText;
}

function getAccordionId(parentText, childText) {
    if (childText) return VAL_ACC + parentText + VAL_CHILD;
    else return ID_ACCORDION_PARENT;
}

function getAccordionBtnClass(parentText, childText) {
    if (childText) return VAL_CLASS_ACC_CHILD_BTN;
    else return VAL_CLASS_ACC_PARENT_BTN;
}