<script>
	import axios from 'axios';

	export var data = {
		city: '',
		state: '',
		country: '',
		latitude: 0,
		longitude: 0
	};

	export async function handleSubmit() {
		const params = {
			access_key: '<ENTER API KEY>',
			query: data.city + ', ' + data.state + ', ' + data.country
		};

		axios
			.get('http://api.positionstack.com/v1/forward', { params })
			.then(function (response) {
				data.latitude = response.data.data[0].latitude;
				data.longitude = response.data.data[0].longitude;
				console.log(response);
				console.log(data.latitude);
				console.log(data.longitude);
			})
			.catch(function (error) {
				console.log(error.toJSON());
			});
	}
</script>

<div class="form">
	<label for="avatar">City</label>
	<input bind:value={data.city} /><br />

	<label for="avatar">State</label>
	<input bind:value={data.state} /><br />

	<label for="avatar">Country</label>
	<input bind:value={data.country} /><br />

	<button on:click={handleSubmit}> Find Coordinates </button>

	<p>
		Latitude: {data.longitude}<br />
		Longitude: {data.latitude}<br />
	</p>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
