<template>
	<div>
	    <select class="form-control" 
	    	v-model="stateSelected"    	
	    	v-validate="'required'" :name="name"
	    	@change="changeItem">
			<option v-for="state in states" 
			      :value="state.sigla">{{state.nome}}</option>
	    </select>
	    <span class="text-danger">{{ errors.first('estado') }}</span>		
	</div>
</template>

<script>
	export default {
		name: "selectOption", 
		props:['item', 'name'],
		data() {
			return {
					stateSelected: null,
	    			states: [
					            {
					                sigla: "AC",
					                nome: "Acre",
					            },
					            {
					                sigla: "AL",
					                nome: "Alagoas",
					            },
					            {
					                sigla: "AP",
					                nome: "Amapá",
					            },
					            {
					                sigla: "AM",
					                nome: "Amazonas",
					            },
					            {
					                sigla: "BA",
					                nome: "Bahia",
					            },
					            {
					                sigla: "CE",
					                nome: "Ceará",
					            },
					            {
					            	sigla: "DF", 
					            	nome: "Distrito Federal"
					            },
					            {
					                sigla: "ES",
					                nome: "Espírito Santo",
					            },
					            {
					                sigla: "GO",
					                nome: "Goiás",
					            },
					            {
					                sigla: "MA",
					                nome: "Maranhão",
					            },
					            {
					                sigla: "MT",
					                nome: "Mato Grosso",
					            },
					            {
					                sigla: "MS",
					                nome: "Mato Grosso do Sul",
					            },
					            {
					                sigla: "MG",
					                nome: "Minas Gerais",
					            },
					            {
					                sigla: "PA",
					                nome: "Pará",
					            },
					            {
					                sigla: "PB",
					                nome: "Paraíba",
					            },
					            {
					                sigla: "PR",
					                nome: "Paraná",
					            },
					            {
					                sigla: "PE",
					                nome: "Pernambuco",
					            },
					            {
					                sigla: "PI",
					                nome: "Piauí",
					            },
					            {
					                sigla: "RJ",
					                nome: "Rio de Janeiro",
					            },
					            {
					                sigla: "RN",
					                nome: "Rio Grande do Norte",
					            },
					            {
					                sigla: "RS",
					                nome: "Rio Grande do Sul",
					            },
					            {
					                sigla: "RO",
					                nome: "Rondônia",
					            },
					            {
					                sigla: "RR",
					                nome: "Roraima",
					            },
					            {
					                sigla: "SC",
					                nome: "Santa Catarina",
					            },
					            {
					                sigla: "SP",
					                nome: "São Paulo",
					            },
					            {
					                sigla: "SE",
					                nome: "Sergipe",
					            },
					            {
					                sigla: "TO",
					                nome: "Tocantins",
					            }
				            ]
        		}						
		},
		methods: {
			changeItem: function() {
				this.$emit('getState', this.stateSelected); //Envia um sinal para um v-on do pai
				this.$emit('setStateToCity', this.stateSelected);
			}
		}
	}
</script>

<style>
	
</style>