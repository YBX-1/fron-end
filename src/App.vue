<script lang="ts" setup>
import { reactive, ref,watchEffect} from 'vue'
const tableData = ref([]); //all form datas
const dialogFormVisible = ref(false) //whether add contact dialog is visible
const dialogEditFormVisible = ref(false) //whether edit contact dialog is visible
var filteredData =ref([]);
function refresh() {
        location.reload()
    }
        
        const formLabelWidth = '140px'
        const form = reactive({
            name: '',
            number: '',
            delivery: false,
            type: [],
            resource: '',
        })
        const form1 = reactive({
            name: '',
            number: '',
            delivery: false,
            type: [],
            resource: '',
        })
        const rules = {
            name: [
                { required: true, message: 'name cant be empty', trigger: 'blur' },
            ],
            number: [
                { required: true, message: 'phone number cant be empty', trigger: 'blur' },
            ],
        }
        // get datas from api
        const url = 'http://127.0.0.1:8091/Contact/findAll'
          async function fetchHotSearch() {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
                    }
                });
                const data = await response.json();
                // comfirm data is an array and push to tableData
                if (data.data && Array.isArray(data.data)) {
                    tableData.value= data.data;
                } else {
                    console.error('Expected an array, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchHotSearch() //load data when page loaded
    async function addContact() {
        var raw = JSON.stringify({
            "name": form.name,
            "number": form.number
        });
    try {
        const response = await fetch('http://127.0.0.1:8091/Contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw,
            
        });
        const newContact = await response.json();
        console.log('添加联系人成功:', newContact);
        tableData.value.push(newContact)
        return newContact;
    } catch (error) {
        console.error('添加联系人失败: ', error);
    }
    }
    const formRef = ref(null); //form reference
    function handAddContact() {
        if (!form.name || !form.number) {
            return;
        }
        dialogFormVisible.value = false;
        addContact()
        form.name = '';
        form.number = '';
        formRef.value.clearValidate();
    }
    
        // deleteContact
        async function deleteContact(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8091/Contact/${parseInt(id)}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
                }
            });
            tableData.value = tableData.value.filter(item => item.id !== id);
            // this.tableData.splice(this.tableData.findIndex(item => item.id === id), 1);
            if (!response.ok) {
                throw new Error('删除联系人失败');
            }
            console.log('联系人删除成功');
        } catch (error) {
            console.error('删除联系人失败:', error);
        }
        }
    
    // updateContact 
    async function updateContact(id, updatedContact) {
    try {
        const response = await fetch(`http://127.0.0.1:8091/Contact/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact),
        });
        if (!response.ok) {
            throw new Error('更新联系人失败');
        }
        const contact = await response.json();
        console.log('更新后的联系人:', contact);
        tableData.value[currentIndex.value] = contact;
        return contact;
    } catch (error) {
        console.error('更新联系人失败:', error);
    }
    }
    const currentIndex = ref(null); // current index of the row being edited
    function openEditForm(row, index ) {
        currentIndex.value = index;
        //open edit dialog
        dialogEditFormVisible.value = true;
    }
    // edit form
    function handleEdit() {
        if (!form1.name || !form1.number) {
            return;
        }
        dialogEditFormVisible.value = false;
        // update contact data operation
        updateContact( tableData.value[currentIndex.value].id , {
            name: form1.name,
            number: form1.number,
        });
        form1.name = '';
        form1.number = '';
        formRef.value.clearValidate();
    }
    
        
    
</script>
<template>
    <!-- add dialog -->
    <el-dialog v-model="dialogFormVisible" title="Add Contact" width="500" id="a">
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="contact name" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="phone number" :label-width="formLabelWidth" prop="number">
                <el-input v-model="form.number" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false, form.name = '', form.number = '', formRef.clearValidate()">Cancel</el-button>
              <!-- Add operation -->
              <el-button type="primary" @click="handAddContact()">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogEditFormVisible" title="Edit Contact" width="500" id="b">
        <el-form :model="form1" :rules="rules" ref="formRef">
          <el-form-item label="contact name" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form1.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="phone number" :label-width="formLabelWidth" prop="number">
                <el-input v-model="form1.number" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialogEdit-footer">
              <el-button @click="dialogEditFormVisible = false, form1.name = '', form1.number = '', formRef.clearValidate()">Cancel</el-button>
              <el-button type="primary" @click="handleEdit()">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
    <el-button plain @click="dialogFormVisible = true" type="primary" class="add-contact-btn">Add contact</el-button>
            <el-table :data="tableData" style="width: 100vw; height: 80vh;">
                <el-table-column label="op"  align="center">
                    <template v-slot="scope">
                        <el-button type="parimary" @click="openEditForm(scope.row, scope.$index)">Edit</el-button>
                        <el-button type="warning" @click="deleteContact(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
              <el-table-column prop="name" label="Name" align="center" width="180" />
              <el-table-column prop="number" label="Phone Number" align="center"/>
              
            </el-table>
</template>
<style scoped>
    #a, #b {
        border: 1px solid #ccc;
    }
</style>
