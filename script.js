const screen = document.getElementById("screen");

const operands = ['0']; // all the operands will be stored in here, in the form of strings
const operators = []; // all the operators will be stored in here, in the form of characters

const equationDisplayer = document.getElementById("equation-that-is-solved");

let isResultant = false;

function scrollToRight() { // for the scroll bar be always at the right side
    const scrollContainer = document.getElementById('scroll-inner');
    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
}

window.addEventListener('DOMContentLoaded', scrollToRight());

function renderDOM() { // only useful for rendering numbers and operators before '=' is pressed
    screen.innerHTML = "";
    for (let i = 0; i < operands.length; i++) // when operators are one less than the operands
        screen.innerHTML += `${operands[i]}${operators[i] ? operators[i] : ''}`;
    scrollToRight();
}

function clearEquationScreen() {
    equationDisplayer.innerHTML = "";
    isResultant = false;
}

function clearAll() {
    clearEquationScreen();
    operands.splice(0, operands.length); // emptying operands array
    operators.splice(0, operators.length); // emptying operators array
    operands.push('0');
    renderDOM();
}

function isPositive(num) { // helper function
    return Number(num) > 0;
}

function isOperator(operator) { // helper function
    return operator === '+' || operator === '-' || operator === 'x' || operator === '÷';
}

function toggleSign() { // 5 cases in here
    if (isResultant) // 1. if previously result was calulated
        clearEquationScreen();

    const screenTxtLastChar = screen.innerHTML[screen.innerHTML.length - 1];

    if (operands.length === 1 && operands[0] === '0' && operators.length === 0) { // 2. initial stage
        if (screen.innerHTML === '0')
            screen.innerHTML = '-';
        else // means there is only one character on the screen panel '-', then go back to initial stage
            screen.innerHTML = '0';
    }
    else if ((operands.length === 1) && (operators.length === 0)) { // 3. there is only one operand and no operator (i.e., 22 -> -22)
        // now 3 cases in here
        if (operands[0] === "Error") { // 1. if previously result was calulated, and the result was "Error" for the case Infinity x 0
            operands.pop(); // remove the error
            operands.push('0'); // go back to the initial stage
            renderDOM();
            toggleSign();
            return;
        }

        if (isPositive(operands[0]) || operands[0] === "0.") // 2. if the operand was positive, or 0.
            operands[0] = `-${operands[0]}`;
        else
            operands[0] = `${operands[0].slice(1)}`; // 3. if the operand was already negative, then removing the prefix minus sign
        renderDOM();
    } else if (!isNaN(screenTxtLastChar) || screenTxtLastChar === '.') { // 4. or the last character on the screen panel is an operand (i.e., 22+4 -> 22+-4 || 22-4 -> 22--4)
        if (isPositive(operands[operands.length - 1]) || operands[operands.length - 1] === "0.") // if the last operand starts with a minus
            operands[operands.length - 1] = `-${operands[operands.length - 1]}`;
        else
            operands[operands.length - 1] = `${operands[operands.length - 1].slice(1)}`;
        renderDOM();
    } else { // 5. or the last character on the screen panel is an operator
        const screenTxtSecondLastChar = screen.innerHTML[screen.innerHTML.length - 2] ? screen.innerHTML[screen.innerHTML.length - 2] : '';
        if (screenTxtSecondLastChar && screenTxtLastChar === '-' && isOperator(screenTxtSecondLastChar)) // if the last character is minus and the second last character is any operator then remove the last character (minus sign), (i.e., 22*- -> 22* || 22-- -> 22-)
            screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
        else // if the last character is operator and the second last character is operand then concatenate a minus sign
            screen.innerHTML += '-';
    }
}

function deleteOneChar() { // 4 cases in here
    if (isResultant) // 1. if previously result was calulated
        clearAll();

    const screenTxtLastChar = screen.innerHTML[screen.innerHTML.length - 1];

    if ((screenTxtLastChar === '÷' || screenTxtLastChar === 'x' || screenTxtLastChar === '+')) // 2. if the last character is +, x, or ÷, then just remove it. 
        operators.pop();
    else if (screenTxtLastChar === '-') { // 3. as minus can also be used for negating an operand
        const screenTxtSecondLastChar = screen.innerHTML[screen.innerHTML.length - 2] ? screen.innerHTML[screen.innerHTML.length - 2] : '';

        if (screenTxtSecondLastChar) {
            if (isOperator(screenTxtSecondLastChar)) { // if the second last character is also an operator (+, -, x, ÷), then this means, this last character (minus) is the one that is used for negating an operand (i.e., 22+-), so just remove it
                screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
                return;
            }
            else // the minus is an operator, not operand negator
                operators.pop();
        } else { // means there is only one character on the screen panel '-', then go back to initial stage
            screen.innerHTML = '0';
            return;
        }
    }
    else { // 4. the last character is an operand (with or without decimal point) 
        // now 5 cases in here as well
        if (operands.length === 1 && operands[0] === '0' && operators.length === 0) // 1. for initial stage
            return;
        else if (operands[0] === "Infinity" || operands[0] === "-Infinity") { // 2. if the operand is infinity
            clearAll();
            return;
        }

        // else case
        const screenTxtSecondLastChar = screen.innerHTML[screen.innerHTML.length - 2] ? screen.innerHTML[screen.innerHTML.length - 2] : '';
        if (!screenTxtSecondLastChar) { // 3. returning to initial stage, as the last character is the only character on the screen and it is an operand
            operands.pop();
            operands.push('0');
        }
        else if (screenTxtSecondLastChar && isOperator(screenTxtSecondLastChar)) // 4. the second last character is not empty and the second last character is an operator, (i.e., 8-5 -> 8-)
            operands.pop();
        else { // the second last character is also an operand
            const oldOperand = operands.pop();
            const newOperand = oldOperand.slice(0, oldOperand.length - 1); // 5. as currently the operand is an string
            operands.push(newOperand);
        }
    }
    renderDOM();
}

function setOperator(operator) { // 6 cases in here
    if (isResultant && operands[0] !== "Error") // 1. if previously result was calulated
        clearEquationScreen();

    const screenTxtLastChar = screen.innerHTML[screen.innerHTML.length - 1];

    if (screenTxtLastChar === operator) // 2. if the last character and the currently pressed operator button is same, then do nothng, (i.e., 1- was present and - was pressed again)
        return;
    else if (((screenTxtLastChar === '÷' || screenTxtLastChar === 'x' || screenTxtLastChar === '+') && (operator === '÷' || operator === 'x' || operator === '+'))
        || (screenTxtLastChar === '+' && operator === '-')) { // 3. in calculator x, ÷, + can be replaced by each other (1st condition) and same for + and - (2nd condition)
        operators.pop();
        operators.push(operator);
    }
    else if ((screenTxtLastChar === '÷' || screenTxtLastChar === 'x') && (operator === '-')) { // 4. the next operand will be negative
        screen.innerHTML += '-';
        return;
    }
    else if (screenTxtLastChar === '-') { // 5. the last character is minus
        // now 2 cases in here
        if (screen.innerHTML.length === 1 && (operator === '÷' || operator === 'x' || operator === '+')) // only one character on the screen and that is minus
            return;
        else { // more than one character that is -, and - can be replaced by x, ÷, + as well
            operators.pop();
            operators.push(operator);
        }
    }
    else { // 6. last character is an operand
        // now 2 cases in here
        if (operands.length === 1 && operands[0] === '0' && !isResultant) { // 1. initial stage
            if (operator === '-') { // (0 x, 0 +, 0 ÷ is poosible but 0 - -> means a negation, so -)
                screen.innerHTML = '-';
                return;
            }
        }
        else if (operands.length === 1 && operands[0] === "Error") { // for the error case, (i.e., Infinity x 0)
            operands.pop(); // pop "Error"
            operands.push('0'); // and go back to the initial stage
            renderDOM();
            setOperator(operator);
            return;
        }
        operators.push(operator); // 2. else, more than one operand
    }
    renderDOM();
}

function num(digit) { // 5 cases in here
    if (isResultant) { // 1. previously result is calculated, this will also work for the "Error" case
        clearEquationScreen();
        operands.pop(); // there was only one operand at 0th index and now it also has been removed
        operands.push(digit);
        renderDOM();
        return;
    }

    const screenTxtLastChar = screen.innerHTML[screen.innerHTML.length - 1];

    if (operands.length === 1 && operands[0] === '0' && operators.length === 0 && digit === '0') // 2. remain in the initial stage
        return;
    else if (isOperator(screenTxtLastChar)) { // 3. the last character is an operator
        // now 2 cases in here as well
        if (screenTxtLastChar === '-') { // 1. if the last character is '-'
            const screenTxtSecondLastChar = screen.innerHTML[screen.innerHTML.length - 2] ? screen.innerHTML[screen.innerHTML.length - 2] : '';

            if (!screenTxtSecondLastChar || isOperator(screenTxtSecondLastChar)) { // if there is no second last character or the second last character is also an operator (i.e., 2x-), this means the last character (minus) is a negator
                operands.pop(); // popping 0 out
                const newOperand = '-' + digit; // concatenate
                operands.push(newOperand);
            } else // this minus is an operator not negator
                operands.push(digit);
        }
        else // 2. else, for any other operator, it is a another (next) operand
            operands.push(digit);
    }
    else if ((operands.length === 1 && operands[0] === '0' && operators.length === 0) ||
        (operands[operands.length - 1] === '0')) { // 4. get out of the initial stage, or the last operand was also zero like (5+2-0 -> 5+2-7 [7 pressed])
        operands.pop();
        operands.push(digit);
    }
    else if (!isNaN(screenTxtLastChar) || screenTxtLastChar === '.') { // 5. if the last character on the screen panel is a number or a decimal point
        const oldOperand = operands.pop();
        const newOperand = oldOperand + digit; // concatenate
        operands.push(newOperand);
    }
    renderDOM();
}

function addDecimalPoint() { // 5 cases in here
    if (isResultant && operands[0] !== "Error") { // 1. if previously result was calulated
        clearEquationScreen();
        addDecimalPoint(); // recursive call, but will stop after one call as in clearEquationScreen is Resultant will be set to false
    }

    const screenTxtLastChar = screen.innerHTML[screen.innerHTML.length - 1];

    if (!isNaN(screenTxtLastChar)) { // 2. if the last character is an operand, (i.e. 9 -> 9.)
        // now 2 cases in here as well
        const oldOperand = operands.pop();

        if (oldOperand.includes('.')) { // 1. if the operand already ha '.', no need for another '.'
            operands.push(oldOperand);
            return;
        }

        const newOperand = oldOperand + '.'; // 2. else, concatenate a '.'
        operands.push(newOperand);
    }
    else if (isOperator(screenTxtLastChar)) { // 3. if the last character is an operator
        const newOperand = "0.";
        operands.push(newOperand);
    }
    else if (operands[0] === "Error") { // 4. if previously result was calulated and the result was error for Infinit x 0
        operands.pop(); // remove "Error"
        operands.push('0'); // go back to initial stage
        renderDOM();
        addDecimalPoint();
        return;
    }
    else // 5. if the last character is decimal point itself
        return;
    renderDOM();
}

function calculate() { // 4 cases in here
    const equationToSolve = screen.innerHTML; // this will be used later
    let modifiedEquationToSolve = equationToSolve;

    if ((operands.length === 1 && operators.length === 0) || equationToSolve === '-') { // 1. when there is only one operand and no operator, 2. or there is only one character on the screen and that is '-'
        if (!(equationToSolve === '-'))
            equationDisplayer.innerHTML = `${equationToSolve}=`;
        isResultant = true;
        return;
    }
    else if (operands.length === operators.length) { // 3. when the number of operators are same as the number of operands, (i.e., 2+6- -> minus is unnecessary here so it will be removed, i.e., the equation will be modified)
        modifiedEquationToSolve = "";
        for (let i = 0; i < operands.length; i++) // when operators are one less than the operands
            modifiedEquationToSolve += `${operands[i]}${operators[i] ? operators[i] : ''}`;
        modifiedEquationToSolve = modifiedEquationToSolve.slice(0, modifiedEquationToSolve.length - 1);
    }

    // 4. (else case) when the number of operands is one more than the number of operators

    modifiedEquationToSolve = modifiedEquationToSolve.replaceAll('x', '*'); // if 'x' is present replace it with '*', otherwise return the og equation
    modifiedEquationToSolve = modifiedEquationToSolve.replaceAll('÷', '/'); // if '÷' is present replace it with '/', otherwise return the og equation

    operands.splice(0, operands.length); // emptying operands array
    operators.splice(0, operators.length); // emptying operators array

    const result = eval(modifiedEquationToSolve);
    operands[0] = `${isNaN(result) ? "Error" : result}`; // error for the case, Infinity x 0

    equationDisplayer.innerHTML = `${equationToSolve}=`;
    isResultant = true;
    renderDOM();
}

// keyboard support for the program
document.addEventListener("keydown", event => {
    const eventKey = event.key;

    if (eventKey === "Backspace")
        deleteOneChar();
    else if (eventKey === '+' || eventKey === '-' || eventKey === '/' || eventKey === '*' || eventKey === '÷' || eventKey === 'x') {
        if (eventKey === '+' || eventKey === '-' || eventKey === '÷' || eventKey === 'x')
            setOperator(eventKey);
        else if (eventKey === '/')
            setOperator('÷');
        else
            setOperator('x');
    }
    else if (eventKey === '1' || eventKey === '2' || eventKey === '3' || eventKey === '4' || eventKey === '5' || eventKey === '6' || eventKey === '7' || eventKey === '8' || eventKey === '9' || eventKey === '0')
        num(eventKey);
    else if (eventKey === '.')
        addDecimalPoint();
    else if (eventKey === '=' || eventKey === "Enter")
        calculate();
});