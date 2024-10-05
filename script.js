document.getElementById('addFieldBtn').addEventListener('click', addField);
document.getElementById('calculateBtn').addEventListener('click', calculateTotalTenurity);

function addField() {
    const inputFields = document.getElementById('inputFields');
    const newField = document.createElement('div');
    newField.className = 'input-group mb-2';
    newField.innerHTML = `
        <input type="text" class="form-control" placeholder="1.3 (Year.Month)" />
        <div class="input-group-append">
            <button class="btn btn-danger" onclick="removeField(this)">Remove</button>
        </div>
    `;
    inputFields.appendChild(newField);
}

function removeField(button) {
    const fieldGroup = button.closest('.input-group'); // Get the closest input group
    if (fieldGroup) {
        fieldGroup.remove(); // Remove the input group
    }
}

function validateInput(value) {
    const regex = /^(?:\d+(?:\.(0?[1-9]|1[0-2]))?|\d*\.(0?[1-9]|1[0-2]))$/; // Allow integers or decimal with months 0-12
    return regex.test(value);
}

function calculateTotalTenurity() {
    const inputs = document.querySelectorAll('#inputFields input');
    let totalYears = 0;
    let totalMonths = 0;
    let invalidInputs = false;

    inputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            if (validateInput(value)) {
                const parts = value.split('.');
                const years = Number(parts[0]);
                const months = parts[1] ? Number(parts[1]) : 0; // Default to 0 if no months provided

                if (months >= 0 && months <= 12) {
                    totalYears += years;
                    totalMonths += months;
                } else {
                    invalidInputs = true;
                    alert(`Invalid input: ${value}. Months must be between 0 and 12.`);
                }
            } else {
                invalidInputs = true;
                alert(`Invalid input: ${value}. Please use the format "X.Y" where Y is optional.`);
            }
        }
    });

    // Convert total months into years
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;

    if (!invalidInputs) {
        document.getElementById('result').innerText = `Total Tenurity: ${totalYears} years and ${totalMonths} months`;
    }
}
