<template>	
  <div id="app">
        <div class="login-area">
            <div class="row no-gutters">
                <div class="col-md-6">
                	<left-page></left-page>
                </div>
                <div class="col-md-6 d-flex justify-content-center">
                	<form-donator></form-donator>
                </div>
            </div>
        </div>
  </div>			
</template>

<script>
import LeftPage from './components/LeftPage'
import FormDonator from './components/FormDonator'


export default {
  name: 'App',
  components: {
  	LeftPage,
    FormDonator    
  }
}
</script>

<style>
  .wizard-btn {
    border-color: #bf090d !important;
    background-color: #bf090d !important; 
  }

  .wizard-icon-circle .md .checked{
    border-color: #bf090d !important;
    background-color: #bf090d !important;  
    color: #fff;
  }

  .wizard-icon-circle.md.checked {
    border-color: #bf090d !important;  
  }

  .wizard-icon-container  {  
    border-color: #bf090d !important;  
    background-color: #bf090d !important; 
  }

</style>
