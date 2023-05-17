
<!-- <v-data-table :headers="headers" :items="items" :item-key="itemKey" hide-default-footer class="elevation-1"> -->


 
    
<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card>
                            <v-card-title class="text-center">
                                <h2>Convidados</h2>
                            </v-card-title>
                            <v-card-text>


                                <!-- ------------IMPUT-------------------->

                                <v-card class="mx-auto" color="grey-lighten-3" max-width="400">
                                    <v-card-text>
                                        <!-- IMPUT PARA SALVAR -->
                                        <v-text-field v-if="contador == 0" v-model="username" density="compact"
                                            variant="solo" label="Convidados" append-inner-icon="mdi-content-save"
                                            single-line hide-details @click:append-inner="adicionar()">
                                        </v-text-field>


                                        <!-- IMPUT PARA EDITAR -->
                                        <v-text-field v-if="contador == 1" v-model="username" density="compact"
                                            variant="solo" label="Convidados"
                                            append-inner-icon="mdi-content-save-edit-outline" single-line hide-details
                                            @click:append-inner="salvar()">
                                        </v-text-field>
                                    </v-card-text>
                                </v-card>

                                <!-- -----------LISTA------------- -->

                                <!-- teste -->
                                <v-table :headers="headers" :items="items" :item-key="itemKey" hide-default-footer
                                    class="elevation-2">
                                    <thead>
                                        <tr class="cabecalho" style="background-color: #bfbfbf;">
                                            <th class="quant">
                                                <strong>N°</strong>
                                            </th>
                                            <th class="nome">
                                                <strong>NOMES</strong>
                                            </th>
                                            <th class="botoesD">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(post, i) in lista" :key="post">
                                            <td class="quant">{{ i }}</td>
                                            <td class="nome">{{ post }}</td>
                                            <td>
                                                <div class="botoesD">
                                                    <v-col cols="auto">
                                                        <v-btn density="compact" icon="mdi-trash-can-outline"
                                                            @click="excluir(i)" style="background-color: #c98f8f;"></v-btn>
                                                    </v-col>
                                                    <v-col cols="auto">
                                                        <v-btn density="compact" icon="mdi-pencil" @click="editar(i)"
                                                            style="background-color: #aaeded;"></v-btn>
                                                    </v-col>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>


                                <!-- ------------TESTE INICIO--------------------->

                                <!---------------TESTE FINAL --------------------->




                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
    
<style>
.v-table>.v-table__wrapper>table>thead>tr>th {
    padding: 0 5px;
    height: auto;
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
    padding: 0 5px;
    height: 10px;
}

.v-col.v-col-auto {
    padding: 6px;
}


.quant {
    width: 10px;
    height: auto;
}

.nome {
    width: 100%;
    height: auto;
}

.botoes {}

.botoesD {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: auto;
}

.cabecalho {
    height: 30px;
    font-size: inherit;
    height: 30px;
    font-family: inherit;
}
</style>
      
<script>
export default {
    data() {
        return {
            username: "",
            contador: 0,
            lista: [],
            posicao: ""
        };
    },
    methods: {
        adicionar() {
            this.lista.push(this.username)
            this.username = ""
            console.log(this.lista);
        },
        salvar() {
            this.lista[this.posicao] = this.username
            this.contador = 0
            this.username = ""
            console.log(this.lista);

        },
        excluir(i) {
            this.lista.splice(i, 1)
            return this.lista
        },
        editar(i) {
            this.username = this.lista[i]
            this.posicao = i
            this.contador = 1
        }


    }
};
</script>
      