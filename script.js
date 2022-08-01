// color code
const iptColor = document.querySelector('#iptColor');
const iptOpacity = document.querySelector('#iptOpacity');
const hexCode = document.querySelector('#hexCode');
const rgbaCode = document.querySelector('#rgbaCode');
let colorChips = document.querySelectorAll('.chiparea');

// hex to RGB
const hexToRGB = (hex, alpha) => {
    if (hex !== null) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
    
        if (alpha !== 1) {
            return `rgba(${r},${g},${b},${alpha})`;
        } else {
            return `rgb(${r},${g},${b})`;
        }
    }
};

// select chip
const selectChip = allChips => {
    allChips.forEach(chip => {
        chip.addEventListener('click', () => {
            allChips.forEach(each => {
                each.classList.remove('active');
            });
            chip.classList.add('active');

            const chipHexCode = chip.getAttribute('data-hexcode');
            const chipOpacity = chip.getAttribute('data-opacity');
            const chipRGBCode = hexToRGB(chipHexCode, chipOpacity);
            
            hexCode.textContent = chipHexCode;
            rgbaCode.textContent = chipRGBCode;
        });
    });
};

selectChip(colorChips);

// add chip
const colorTable = document.querySelector('#colorTbl tbody');
const chipAddBtn = document.querySelector('#chipAddBtn');

const createTableRow = () => {
    const tableObj = {
        rows : colorTable.querySelectorAll('tr'),
        cells : colorTable.querySelectorAll('td'),
        lastIdx : colorTable.querySelectorAll('tr').length - 1,
    };

    const createObj = {
        tr : document.createElement('tr'),
        td : document.createElement('td'),
        span : document.createElement('span'),
        button : document.createElement('button'),
        chk : document.createElement('input'),
        createCell : function() {
            createObj.td.appendChild(createObj.span);
            createObj.td.appendChild(createObj.button);
            createObj.span.classList.add('chiparea');
            createObj.button.classList.add('btn--chipdelete');
        },
        addCell : function() {
            tableObj.rows[tableObj.lastIdx].appendChild(createObj.td);
            createObj.createCell();
        },
        addRow : function() {
            colorTable.appendChild(createObj.tr);
            createObj.tr.appendChild(createObj.td);
            createObj.createCell();
        }
    };

    if ((tableObj.cells.length % 6) === 0) {
        createObj.addRow();
    } else {
        createObj.addCell();
    }
};

chipAddBtn.addEventListener('click', () => {
    createTableRow();

    colorChips = document.querySelectorAll('.chiparea');

    selectChip(colorChips);
});


// change color code
const changeColorChip = valOfHex => {
    let rgbAlpha = Number(iptOpacity.value) / 100;
    let hexVal = valOfHex;
    let rgbaVal;

    rgbaVal = hexToRGB(hexVal, rgbAlpha);

    hexCode.textContent = hexVal;
    rgbaCode.textContent = rgbaVal;

    colorChips.forEach(chip => {
        if (chip.classList.contains('active')) {
            chip.setAttribute('data-opacity', rgbAlpha);
            chip.setAttribute('data-hexcode', hexVal);
            chip.style.backgroundColor = `${rgbaVal}`;
        };
    });
};

// change chip color after changing input value
const inputs = document.querySelectorAll('.ipt');

inputs.forEach(input => input.addEventListener('change', changeColorChip(iptColor.value)));

// delete chips
const chipDeleteBtn = document.querySelector('#chipDeleteBtn');

chipDeleteBtn.addEventListener('click', () => {
    chipDeleteBtn.classList.toggle('active');

    const chipDelBtn = document.querySelectorAll('.btn--chipdelete');

    if (chipDeleteBtn.classList.contains('active')) {
        chipAddBtn.setAttribute('disabled','true');
        colorChips.forEach(chip => {
            chip.style.boxShadow = "none";
        });

        chipDelBtn.forEach(each => {
            each.style.display = 'block';

            each.addEventListener('click', () => {
                const cell = each.parentElement;
                const row = cell.parentElement;

                // cell.remove();

                console.log(cell.parentNode);
            });
        });
    } else {
        chipAddBtn.removeAttribute('disabled');
        colorChips.forEach(chip => {
            chip.removeAttribute('style');
        })

        chipDelBtn.forEach(each => {
            each.style.display = 'none';
        });
    }
});

// generate random color chip
const generateBtn = document.querySelector('#generateBtn');

generateBtn.addEventListener('click', () => {
    const rnHexCode = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;

    changeColorChip(rnHexCode);
});
