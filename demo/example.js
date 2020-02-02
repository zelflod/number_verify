import {NumberInput} from "../dist/index.es.js";

const numInput = new NumberInput('our-input', {
	mask: '+7(985)II-X*-**',
});

const numInput2 = new NumberInput('our-input2', {
	mask: '+7(985)II-X*-**',
	value: '32',
	valid: false,
	errorMessage: 'Неверный номер, попробуйте еще раз'
});

document.getElementById('check1').addEventListener('click', () => {
	numInput.setProps({
		mask: '+7(985)II-X*-**',
		value: numInput.value,
		valid: numInput.value === '77',
		errorMessage: 'Неверный номер, попробуйте еще раз'
	});
});

document.getElementById('check2').addEventListener('click', () => {
	numInput2.setProps({
		mask: '+7(985)II-X*-**',
		value: numInput2.value,
		valid: numInput2.value === '77',
		errorMessage: 'Неверный номер, попробуйте еще раз'
	})
});

