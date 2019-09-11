---
layout: page
title: Sobre
permalink: /about/
---

<style>
.contact__title{
  text-align: center;
}
.form{
  max-width: 1200px;
  margin: 0 auto;
}
.form__field{
  padding: 10px;
}
.form__label{
  padding: 10px;
}
.form__input{
  color: #EB3A3A;
  background-color: #000000;
  padding: 10px;
  border: 0;
  border-bottom: 1px #EB3A3A solid;
}
.form__btn{
  background-color: #EB3A3A;
  color: #FFFFFF;
  border: 0;
  padding: 10px;
  cursor: pointer;
}
.form__btn:hover{
  background-color: rgba(235, 58, 58, 0.8);
}
</style>

<h2 class="contact__title">Entre em contato</h2>
<form class="form" name="contact" method="POST" data-netlify="true">
  <div class="form__field">
    <div><label for="name" class="form__label">Nome: </label></div>
    <div><input type="text" id="name" class="form__input"></div>
  </div>
  <div class="form__field">
    <div><label for="email" class="form__label">Email: </label></div>
    <div><input type="mail" id="email" class="form__input"></div>
  </div>  
  <div class="form__field">
    <div><label for="message" class="form__label">Mensagem: </label></div>
    <div><textarea id="message" class="form__input"></textarea></div>
  </div>  
  <input type="submit" value="Enviar" class="form__btn">
</form>
