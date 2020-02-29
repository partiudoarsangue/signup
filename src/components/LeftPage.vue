<template>
	<div class="logo-login logo-height-login gray-bg vh-100 d-flex justify-content-center" id="background">		

	</div>
</template>

<script>
export default {
	data() {
		return {
			campanha: {}, 
			url_companha: null,
		}
	}, 
	created() {			
		if (location.search != "") {
			this.url_companha = location.search;
			this.axios
				.get(`/campanha/?slug_campanha=${location.search.replace('?', '')}`)
				.then(response => {
					this.campanha = response.data[0]
					window.campanha = this.campanha
					console.log(this.campanha)
					$('#background').css("background-image", `url(${this.campanha.banner})`);				
				})			
		}
	},
}
</script>
	
<style>
	#logo {		
		padding: 5px;
		width: 300px;	

	}

	#background {
		background-image: url('../assets/banner.png');						
	}

	 @media only screen and (max-width: 600px) {
		#logo {
			width: 150px;	
		}	    
	}
</style>