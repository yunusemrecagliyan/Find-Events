<template>
  <base-auth>
    <template #form>
      <div class="flex flex-col">
        <span class="text-xl font-bold text-gray-600"> Hoş Geldiniz </span>
        <small class="text-gray-400"
          >Kayıt olmak için bilgilerinizi doldurunuz.</small
        >
      </div>
      <div class="flex flex-col mt-4 w-full gap-3">
        <BaseInput
          :errors="nameErrors"
          label="Ad"
          v-model="registerModel.name"
          name="name"
        />
        <BaseInput
          :errors="usernameErrors"
          label="Kullanıcı Adı"
          v-model="registerModel.username"
          name="username"
        />
        <BaseInput
          :errors="emailErrors"
          label="E-posta"
          v-model="registerModel.email"
          name="email"
        />
        <BaseInput
          :errors="passwordErrors"
          type="password"
          label="Şifre"
          v-model="registerModel.password"
          name="password"
        />
        <BaseButton
          class="mt-4"
          :loading="loading"
          @click="register"
          :disabled="!registerModel.email || !registerModel.password"
        >
          Kayıt ol
        </BaseButton>
      </div>
      <div class="flex w-full justify-center mt-8">
        <small class="text-center">
          Zaten üye misin?
          <router-link
            to="/login"
            class="font-bold hover:underline text-secondary-500"
          >
            Giriş yap</router-link
          >
        </small>
      </div></template
    >
  </base-auth>
</template>

<script setup>
import BaseInput from "../components/Common/BaseInput.vue";
import BaseButton from "../components/Common/BaseButton.vue";

import { watch, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import BaseAuth from "../components/Auth/BaseAuth.vue";

const userStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const registerModel = ref({
  email: "",
  password: "",
  name: "",
  username: "",
});
const emailErrors = ref([]);
const passwordErrors = ref([]);
const nameErrors = ref([]);
const usernameErrors = ref([]);
const loading = ref(false);

const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePassword = (password) => {
  if (password.length < 8) {
    passwordErrors.value.push("Şifreniz en az 8 karakter olmalıdır.");
  }
  if (password.match(/[a-z]/i) < 0) {
    passwordErrors.value.push("Şifreniz en az bir harf içermelidir.");
  }
  if (password.match(/[0-9]/) < 0) {
    passwordErrors.value.push("Şifreniz en az bir rakam içermelidir.");
  }
  return passwordErrors.value.length === 0;
};

watch(
  () => registerModel.value.email,
  (email) => {
    if (!validateEmail(email) && email.includes("@")) {
      emailErrors.value = ["Geçersiz bir e-posta girdiniz."];
    } else {
      emailErrors.value = [];
    }
  }
);

const register = async () => {
  if (!validateEmail(registerModel.value.email)) {
    emailErrors.value = ["Geçersiz bir e-posta girdiniz."];
    return;
  }
  if (!validatePassword(registerModel.value.password)) {
    return;
  }
  if (registerModel.value.name === "") {
    nameErrors.value = ["İsim alanı boş bırakılamaz."];
    return;
  }
  if (registerModel.value.username === "") {
    usernameErrors.value = ["Kullanıcı adı alanı boş bırakılamaz."];
    return;
  }
  emailErrors.value = [];
  passwordErrors.value = [];
  loading.value = true;
  const result = await userStore.register(registerModel.value);
  if (result) {
    toast.success("Başarıyla kayıt oldunuz.");
    router.push("/login");
  } else {
    toast.error("Giriş başarısız.");
  }

  loading.value = false;
};
</script>

<style></style>
