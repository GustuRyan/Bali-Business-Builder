<script setup lang="ts">
const { modal, closeModal } = useModal();
const emit = defineEmits(["completed"]);
const { formatCurrency } = useMoneyFormat();
import { storeToRefs } from "pinia";
import { useFormStore } from "~/stores/form";
const storeForm = useFormStore();
const {
  getIntro: IntroForm,
  totalPerson,
  isLoading,
  getPersons: persons,
  formPersons: FormPersons,
  getTotalOrder: totalOrder,
} = storeToRefs(storeForm);

const selectedPerson = ref();
const selectedEditPerson = ref();

function editPerson(item: any) {
  selectedEditPerson.value = item;
}

function cancelEdit() {
  selectedEditPerson.value = undefined;
}

const addMorePerson = computed(() => {
  if (isLoading.value) {
    return false;
  }
  return totalPerson.value < IntroForm.value.total_apply;
});

const allSelectedPersonsIds = computed(() => {
  return FormPersons.value.map((item) => {
    return item.uuid;
  });
});

const personsFilter = computed(() => {
  return persons.value.filter((item) => {
    return (
      // @ts-ignore
      parseInt(item.is_extend as string) ===
      parseInt(IntroForm.value.is_extend as string)
    );
  });
});

const personsFilterExcluteSelected = computed(() => {
  return personsFilter.value.filter((item) => {
    return !allSelectedPersonsIds.value.includes(item.uuid);
  });
});

const personIsGreaterThenTotalApply = computed(() => {
  return totalPerson.value > IntroForm.value.total_apply;
});

const showContinue = computed(() => {
  return totalPerson.value === IntroForm.value.total_apply;
});

const personForm = ref(null);

const showAddIndentity = computed(() => {
  return totalPerson.value < IntroForm.value.total_apply;
});

function confirmOpenModal() {
  if (personsFilterExcluteSelected.value.length > 0) {
    modal.value = true;
  } else {
    nextPerson();
  }
}

function nextPerson() {
  modal.value = false;
  // @ts-ignore
  personForm.value?.clickButton();
}

function reloadPerson() {
  // @ts-ignore
  personForm.value?.loadPersons();
}

function onChangeSelect() {
  if (selectedPerson.value) {
    storeForm.pushFormPerson(selectedPerson.value);
  }
  selectedPerson.value = undefined;
  modal.value = false;
}

function submit() {
  if (showContinue.value) {
    emit("completed", true);
  } else {
    nextPerson();
  }
}
</script>

<template>
  <div class="rounded-lg border p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:divide-x">
      <FormPerson
        ref="personForm"
        :person="selectedEditPerson"
        @cancel="cancelEdit"
        @reload="reloadPerson"
      />

      <div class="space-y-4 lg:px-8">
        <div class="flex flex-col">
          <div class="font-bold">{{ $t("passport_equipment_desc_txt") }}</div>
          <div class="opacity-50 text-sm">
            {{ $t("passport_equipment_sub_desc_txt") }}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <template v-for="(person, index) in FormPersons" :key="index + 'p'">
            <CardAvatar
              :person="person"
              @reload="reloadPerson"
              @edit="editPerson"
            />
          </template>
          <template v-if="showAddIndentity">
            <CardAddIdentity @click="confirmOpenModal" />
          </template>
        </div>
        <hr />
        <div class="flex justify-between">
          <div>{{ $t("total_txt") }}</div>
          <div class="font-bold">
            {{ formatCurrency(totalOrder) }}
          </div>
        </div>
        <div v-if="showContinue">
          <button
            type="button"
            class="btn btn-neutral btn-block rounded-full"
            @click="submit"
            :disabled="isLoading"
          >
            {{ $t("continue_txt") }}
          </button>
        </div>
        <div v-if="!showContinue" class="text-error">
          <span v-if="personIsGreaterThenTotalApply">
            {{ $t("more_person_txt") }}
          </span>
          <span v-else>
            {{ $t("less_person_txt") }}
          </span>
        </div>
      </div>
    </div>

    <ModalBase v-model="modal" class="p-0 rounded-lg w-10/12 max-w-xl">
      <div class="card card-compact border rounded-lg">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold">{{ $t("existing_person_txt") }}</h3>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-square btn-xs rounded-full"
                @click="closeModal"
              >
                <Icon name="i-heroicons-x-mark" />
              </button>
            </div>
          </div>
          <FormGroup
            label="Person"
            name="person"
            :description="$t('person_existing_note_txt')"
          >
            <select
              name="person"
              class="select select-bordered"
              v-model="selectedPerson"
            >
              <option value="">{{ $t("select_person_txt") }}</option>
              <option
                v-for="(person, index) in personsFilterExcluteSelected"
                :key="index"
                :value="person"
              >
                {{ person.name }} - {{ person.passport_no }}
              </option>
            </select>
          </FormGroup>
          <div class="flex justify-between">
            <div>
              <button
                @click="onChangeSelect"
                type="button"
                :disabled="!selectedPerson"
                class="btn btn-neutral btn-sm h-11 btn-wide rounded-full normal-case"
              >
                {{ $t("use_indentity_txt") }}
              </button>
            </div>
            <div>
              <button
                type="button"
                @click="nextPerson"
                class="btn btn-sm h-11 btn-wide rounded-full normal-case"
              >
                {{ $t("skip_and_create_new_txt") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  </div>
</template>

<style lang="scss" scoped></style>
