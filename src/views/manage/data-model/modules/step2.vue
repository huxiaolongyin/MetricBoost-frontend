<!-- 第二步 -->
<div v-show="current === 2">
    <NFormItem label="字段设置">
      <NDataTable>

      </NDataTable>
    </NFormItem>
  </div>

<!-- 第三步 -->
<div v-show="current === 3">
    <NFormItem :label="$t('page.manage.dataModel.dataModelName')" path="dataModelName">
      <NInput v-model:value="model.dataModelName"
        :placeholder="$t('page.manage.dataModel.form.dataModelName')" />
    </NFormItem>
    <NFormItem :label="$t('page.manage.dataModel.dataModelDesc')" path="dataModelDesc">
      <NInput v-model:value="model.dataModelDesc"
        :placeholder="$t('page.manage.dataModel.form.dataModelDesc')" />
    </NFormItem>
    <NFormItem :label="$t('page.manage.dataModel.dataDomain')" path="dataDomain">
      <NInput v-model:value="model.dataDomain" :placeholder="$t('page.manage.dataModel.form.dataDomain')" />
    </NFormItem>
    <NFormItem :label="$t('page.manage.dataModel.topicDomain')" path="topicDomain">
      <NInput v-model:value="model.topicDomain" :placeholder="$t('page.manage.dataModel.form.topicDomain')" />
    </NFormItem>
    <NFormItem :label="$t('page.manage.dataModel.status')" path="status">
      <NRadioGroup v-model:value="model.status">
        <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value"
          :label="$t(item.label)" />
      </NRadioGroup>
    </NFormItem>
  </div>
</NForm>