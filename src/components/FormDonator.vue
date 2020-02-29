<template>  
  <div class="">    
    <form-wizard 
        @on-complete="onComplete"
        title="Cadastro do doador" 
        :start-index.sync="stepIndex"
        subtitle="Estamos muito felizes em ter você aqui"
        back-button-text="Anterior"
        next-button-text="Próximo"
        finish-button-text="Finalizar"
        error-color="#ff4949">
      <tab-content title="Dados para acesso" :before-change="validateForm" ref="step1" id='step1'>
        <div class="form-group">
            <label for="nome">Seu nome completo*</label>
            <input type="text" class="form-control" v-model="doador.nome" name="nome" v-validate="'required'">           
              <span class="text-danger">{{ errors.first('nome') }}</span>                        
        </div>         
        <div class="form-group">
            <label for="email">Seu e-mail*</label>
            <input type="email" class="form-control" name="email" aria-describedby="Email" v-model="doador.email" v-validate="'required|email'"/>                      
            <span class="text-danger">{{ errors.first('email') }}</span>
            <span class="text-danger">{{getBackEndError('email')}}</span>
        </div>
        <div class="form-group">
            <label for="password">Senha para acesso*</label>
            <input type="password" class="form-control" v-model="doador.password" data-vv-as="senha" v-validate="'required'" name="password">
            <span class="text-danger">{{ errors.first('password') }}</span>
            <span class="text-danger">{{getBackEndError('password')}}</span>
        </div>
        <div class="form-group">            
            <label for="password">Como conheceu o #PartiuDoarSangue?*</label>
            <select class="form-control" v-model="doador.canal" name="canal" :key="id" v-validate="'required'" >
              <option v-for="canal in canais"
                      :value="canal.id">{{canal.nome}}</option>              
            </select>
            <span class="text-danger">{{ errors.first('canal') }}</span>
        </div>              
      </tab-content>
      <tab-content title="Dados pessoais" :before-change="validateForm" ref="step2" id='step2'>          
        <div class="form-group">
            <label for="numero_celular">Número celular*</label>
            <the-mask :mask="['(##) ####-####', '(##) #####-####']" class="form-control" v-model="doador.numero_celular" v-validate="'required'" name="numero_celular" data-vv-as="número celular"/>            
            <span class="text-danger">{{ errors.first('numero_celular') }}</span>
            <span class="text-danger">{{getBackEndError('numero_celular')}}</span>
        </div>        
        <div class="form-group">
            <label for="sexo">Sexo*</label>
            <select class="form-control" v-model="doador.sexo" v-validate="'required'" name="sexo">
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            <span class="text-danger">{{ errors.first('sexo') }}</span>
            <span class="text-danger">{{getBackEndError('sexo')}}</span>
        </div>
        <div class="form-group">
            <label for="data_nascimento">Data de nascimento*</label>
            <the-mask :mask="['##/##/####', '##/##/####']" class="form-control" v-model="data_nascimento" v-validate="'required|date_format:DD/MM/YYYY'" masked="true" name="data_nascimento" data-vv-as="data de nascimento"/>
        </div>           
        <span class="text-danger">{{ errors.first('data_nascimento') }}</span>
        <span class="text-danger">{{getBackEndError('data_nascimento')}}</span>    
      </tab-content>
      <tab-content title="Informações sobre doação">
        <div class="form-group">
            <label>Infome seu tipo sanguineo:</label>
            <select class="form-control" v-model="doador.tipo_sanguineo">
              <option value='null'>Não sei meu tipo sanguíneo</option>
              <option v-for="tipo_sanguineo in tipos_sanguineos"
                      v-if="!tipo_sanguineo.visivel_somente_solicitacao" 
                      :value="tipo_sanguineo.id">{{tipo_sanguineo.tipo}}</option>
            </select>
        </div>      
        <div class="form-group">
            <label for="exampleInputPassword1">Data da última doação (Caso tenha doado)</label>
            <the-mask :mask="['##/##/####', '##/##/####']" class="form-control" v-model="data_ultima_doacao"/>
        </div>        
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="doador.doa_medula">
          <label class="form-check-label" for="exampleCheck1">Deseja doar medula?</label>
        </div>
      </tab-content>
      <tab-content title="Locais onde pode doar" :before-change="validateForm">
        <div class="form-group">
            <label for="estado">Estado onde mora*</label>
            <select-state v-on:getState="setState" name="estado" v-validate="'required'">              
            </select-state>
            <span class="text-danger">{{ errors.first('estado') }}</span>
            <span class="text-danger">{{getBackEndError('estado')}}</span>    
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Cidade onde mora*</label>
            <select-city :state="doador.estado" v-on:getCity="setCity" v-validate="'required'" name="cidade"></select-city>
            <span class="text-danger">{{ errors.first('cidade') }}</span>
            <span class="text-danger">{{getBackEndError('cidade')}}</span>
        </div>        
        <div class="form-group">
            <label for="cidades_para_doar">Cidades nas quais pode doar* (Pode selecionar mais de uma)</label>
            <multiselect 
              v-model="cities_selected" 
              selected-label="Selecionado"
              deselectLabel="Enter para remover"
              select-label="Enter pra selecionar"
              tag-placeholder="Selecione as cidades" 
              placeholder="Pesquisar..."               
              label="cidade" track-by="id"
              :allow-empty="citiesAllowEmpty"
              :options="cities_to_donate" 
              :multiple="true" 
              :taggable="true" v-validate="'required'" name="cidate_para_doar" data-vv-as="Cidade onde deseja doar">                
            </multiselect>
            <span class="text-danger">{{ errors.first('cidate_para_doar') }}</span>
            <span class="text-danger">{{getBackEndError('cidate_para_doar')}}</span>
        </div>
       </tab-content>       
       <small class="form-text text-muted">Campos marcados com * são obrigatórios</small>
    </form-wizard>
  </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'  
import SelectState from '@/components/SelectState'
import SelectCity from '@/components/SelectCity'

export default {
  components: {
    FormWizard, 
    TabContent, 
    TheMask, 
    SelectState, 
    SelectCity
  },  
  data() {
    return {     
      canais: [],
      citiesAllowEmpty: false,
      data_nascimento: null,
      data_ultima_doacao: null,       
      doador: {
        estado: null, 
        nome: null,
        email: null, 
        data_nascimento: null,
        password: null, 
        numero_celular: null, 
        cidade: null, 
        cidades: null,
        estado: null,
        sexo: null,
        canal: null
      },
      tipos_sanguineos: [], 
      cities_to_donate: [],
      cities_selected: [],
      stepIndex: 0,
      backendErrors: {}
    };
  }, 
  created() {        
    window.axios = this.axios;
    this.axios.get('/canal/')
      .then(response => {
        this.canais = response.data
      })
      .catch(e => {
        console.log(e)
      })
    this.axios.get('/tiposanguineo/')
      .then(response => {
        this.tipos_sanguineos = response.data;
      })
      .catch(e => {console.log(e)})
  },
  methods: {    
    checkFieldsValid: function(values) {      
      return values.every(function(value){
        console.log('checkFieldsValid', value);
        return value === true
      })
    },
    checkErros: function(errors) {
      if (errors.all().length === 0){        
        return true;
      }
      return false;
    },
    validateFormSetp1: function() {    
      let self = this
      let setepIsValid = true;
      let nameValid = this.$validator.validate('nome')
        .then(function() {
          return self.checkErros(self.errors)
        })  
      let emailValid = this.$validator.validate('email')
        .then(function() {
          return self.checkErros(self.errors)
        })        
      let passwordValid = this.$validator.validate('password')
        .then(function() {
          return self.checkErros(self.errors)
        })        
      let chanelValid = this.$validator.validate('canal')
        .then(function() {
        return self.checkErros(self.errors)
      })
      return [nameValid, emailValid, passwordValid, chanelValid];
    },
    validateFormSetp2: function() {    
      let self = this
      let setepIsValid = true;
      let celularValid = this.$validator.validate('numero_celular')
        .then(function() {
          return self.checkErros(self.errors)
        })  
      let sexoValid = this.$validator.validate('sexo')
        .then(function() {
          return self.checkErros(self.errors)
        })        
      let nascimentoValid = this.$validator.validate('data_nascimento')
        .then(function() {
          return self.checkErros(self.errors)
        })        
      return [celularValid, sexoValid, nascimentoValid];
    },  
    validateFormSetp4: function() {    
      let self = this
      let setepIsValid = true;
      let estatoValid = this.$validator.validate('estado')
        .then(function() {
          return self.checkErros(self.errors)
        })
      let cidadesParaDoarValid = this.$validator.validate('cidate_para_doar')
        .then(function() {
          return self.checkErros(self.errors)
        })         
      if (!this.doador.cidade){
        let fieldCidade = this.$validator.fields.find({name:'cidade'});              
        this.$validator.errors.add({id: fieldCidade.id, field: fieldCidade.name, msg: 'Este campo é obrigatório'})
        fieldCidade.setFlags({
          invalid: true,
          valid: false,
          validated: true,
        });
      }
      return [estatoValid];
    },        
    validateForm: function(step) {      
      let stepsValidators = {
        0: this.validateFormSetp1, 
        1: this.validateFormSetp2,
        3: this.validateFormSetp4,
      }
      let res = stepsValidators[this.stepIndex]();
      let self = this;
      return Promise.all(res).then(function(values){
        return self.checkFieldsValid(values)
      })      
    },
    strToDate: function (date) {
      return this.$moment(date, 'DDMMYYYY').toDate();
    },
    getCitiesToDonate(state) {
      this.axios.get(`/cidadedoacao/?estado=${state}`)
        .then(response => {
          this.cities_to_donate = response.data;
          console.log(this.cities_to_donate)
        })
    },
    setState: function(value) {
      this.doador.estado = value;
      this.getCitiesToDonate(value);
    },
    setCity: function(value) {
      this.doador.cidade = value;
    },
    formatCitiesToDonate(cities) {
      let cities_ids = []
      cities.forEach(function(city){
        cities_ids.push(city.id);
      })
      return cities_ids;
    },
    addBackEndErrors: function(field_error, error) {
      if (field_error === 'username'){
        field_error = 'email';
      }      
      this.backendErrors[field_error] = error
    },
    getBackEndError: function(field) {
      if (field === 'username') {
        field = 'email'
      }
      return this.backendErrors[field];
    },
    getBackendErrorMsg: function(errors) {
      let msgError = ""
      Object.keys(errors).forEach(key_error => {
        this.addBackEndErrors(key_error, errors[key_error]);
        let msg = `<li><span class="text-danger">${errors[key_error]}</span></li><br/>`;
        msgError += msg;
      })      
      return `<ul>${msgError}</ul>`
    },
    onComplete: function(){           
      if (window.campanha) {
        this.doador.campanha = window.campanha.id;
      }
      this.backendErrors = {};       
      let successRegister = `${this.doador.nome}, <p></p>
                Muito obrigado por fazer seu cadastro. Doar sangue é um gesto de amor, que pode
                ajudar a salvar muitas
                vidas. O mundo precisa de mais pessoas como você. Incentive outras pessoas a doar,
                assim como você faz.
                Que Deus lhe abençoe.
                <p></p>
                Um forte abraço,
                <p></p>
                Equipe #partiudoarsangue`;
      this.doador.username = this.doador.email;
      if (this.doador.tipo_sanguineo == 'null') {
        delete this.doador.tipo_sanguineo;
      };
      this.doador.data_nascimento = this.strToDate(this.data_nascimento);
      if(this.data_ultima_doacao) {
        this.doador.data_ultima_doacao = this.strToDate(this.data_ultima_doacao);
      };
      this.doador.cidades = this.formatCitiesToDonate(this.cities_selected);
      let self = this;
      this.axios
        .post('/doadores/', this.doador)
        .then(response => {
            this.$swal({
              type: 'success', 
              title: 'Parabéns', 
              html: successRegister, 
              confirmButtonColor: '#bf090d', 
              onAfterClose: function(){
                window.location.href = "https://partiudoarsangue.com.br"
                // self.axios
                //   .post('/api-token-auth/')
                //   .then(response => {
                    
                //   })

              }
            })
          })
        .catch(e => {          
            this.$swal({
              type: 'error', 
              title: 'Alguns campos estão inválidos', 
              html: this.getBackendErrorMsg(e.response.data), 
              confirmButtonColor: '#bf090d'
            })
        })
    }, 
  },     
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
  .multiselect__option--highlight {
    background: #bf090d !important;
  }
  .multiselect__tag {
    background: #bf090d !important;
  }
  .multiselect__tag-icon {
    color: #fff !important;
  }
  .multiselect__option--highlight {
    background-color: #bf090d !important;
  }
  .multiselect__option:after {
    background-color: #dc3545 !important;
    color: #fff
  }
  .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
    background: #dc3545 !important;
  }
  .multiselect__tag-icon:after {
    color: #fff !important;
  }

  .wizard-title {
    font-weight: bold;
    font-size: 32px;
  }

 @media only screen and (max-width: 600px) {
  .wizard-title {
    font-weight: bold;
    font-size: 22px;
  }
}

</style>