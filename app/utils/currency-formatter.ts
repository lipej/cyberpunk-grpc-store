export default function (price: number) {
	const regex = new RegExp('\\d(?=(\\d{3})+\\D)', 'g');

	return (price / 100).toFixed(2).replace('.', ',').replace(regex, '$&.');
}
