document.addEventListener('DOMContentLoaded', () => {
    const binaryInput = document.getElementById('binaryInput');
    const decimalOutput = document.getElementById('decimalOutput');
    const convertBtn = document.getElementById('convertBtn');
    const inputGroup = binaryInput.parentElement;

    // Helper function to validate binary strings
    function isValidBinary(str) {
        const binaryRegex = /^[01]+$/;
        return binaryRegex.test(str);
    }

    // Conversion Logic
    function performConversion() {
        const rawValue = binaryInput.value.trim();

        // Check if field is empty or invalid
        if (rawValue === '' || !isValidBinary(rawValue)) {
            inputGroup.classList.add('invalid');
            decimalOutput.value = '---';
            return;
        }

        // Clean validation state if passing
        inputGroup.classList.remove('invalid');

        // Translate binary string into a base-10 calculation integer
        const decimalResult = parseInt(rawValue, 2);
        
        // Output result with an engineered clean layout display
        decimalOutput.value = decimalResult;
    }

    // Click trigger interaction
    convertBtn.addEventListener('click', performConversion);

    // Dynamic keyboard cleanup logic while typing
    binaryInput.addEventListener('input', () => {
        // Automatically hide error hints as soon as user types or fixes inputs
        if (inputGroup.classList.contains('invalid')) {
            inputGroup.classList.remove('invalid');
        }
    });

    // Fire processing when user presses Enter directly inside field
    binaryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performConversion();
        }
    });
});
