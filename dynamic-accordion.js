const DATA_TXT_FILE = "diseases.txt";
let dataMap = new Map();

const ELEMENT_BUTTON = "button";
const ELEMENT_DIV = "div";
const ELEMENT_H2 = "h2";
const ELEMENT_SPAN = "span";

const VAL_BUTTON = "button";
const VAL_COLLAPSE = "collapse";
const VAL_FALSE = "false";
const VAL_ACC = "accordion";
const VAL_BADGE = "badge";
const VAL_CLASS_ACC_PARENT_BTN = "btn btn-primary collapsed position-relative m-2";
const VAL_CLASS_ACC_CHILD_BTN = "accordion-button btn btn-secondary";
const VAL_CLASS_ACC_DIV = "accordion-collapse collapse";
const VAL_CLASS_ACC_ITEM = "accordion-item";
const VAL_CLASS_ACC_BODY = "accordion-body";
const VAL_CLASS_ACC_HEADER = "accordion-header";
const VAL_CLASS_ACC = "accordion";
const VAL_CLASS_BADGE = "position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-success";
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
        if (dataLines) {
            dataLines.forEach(buildAccordion);
            dataMap.forEach((value, key) => document.getElementById(getBadgeId(key)).innerText = value.val);
        }
    });

function buildAccordion(dataInput) {
    data = dataInput.split(COLON);
    lenData = data.length;

    if (lenData > 0) categoryName = data[0]; else categoryName = null;
    if (lenData > 1) diseaseName = data[1]; else diseaseName = null;
    if (lenData > 2) diseaseDesc = data[2]; else diseaseDesc = null;

    if (dataMap.has(categoryName)) {
        dataMap.get(categoryName).val++;
    } else {
        dataMap.set(categoryName, {val: 1});
        document.getElementById(ID_ACCORDION_BUTTONS).appendChild(getAccordionButton(categoryName, null));
        document.getElementById(ID_ACCORDION_PARENT).appendChild(getAccordionItem(categoryName, null, null));
    }

   document.getElementById(getAccordionId(categoryName, diseaseName)).appendChild(getAccordionItem(categoryName, diseaseName, diseaseDesc));
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

    if (childText) {
        val.innerText = childText;
    } else {
        val.innerText = parentText;
        val.appendChild(getBadge(parentText));
    }

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

function getBadgeId(parentText) {
    return VAL_BADGE + parentText;
}

function getAccordionBtnClass(parentText, childText) {
    if (childText) return VAL_CLASS_ACC_CHILD_BTN;
    else return VAL_CLASS_ACC_PARENT_BTN;
}

function getBadge(parentText) {
    let val = document.createElement(ELEMENT_SPAN);
    val.setAttribute(ATTRIBUTE_CLASS, VAL_CLASS_BADGE);
    val.setAttribute(ATTRIBUTE_ID, getBadgeId(parentText));
    return val;
}