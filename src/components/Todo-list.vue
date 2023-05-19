
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
                                <div class="total">
                                    <strong>TOTAL:</strong>
                                    {{ this.quant }}
                                </div>

                            </v-card-title>
                            <v-card-text>


                                <!-- ------------IMPUT-------------------->

                                <v-card class="mx-auto" color="grey-lighten-3" max-width="400">
                                    <v-card-text>
                                        <!-- IMPUT PARA SALVAR -->
                                        <v-text-field v-if="contador == 0" v-model="pessoa.nome" density="compact"
                                            variant="solo" label="Convidados" append-inner-icon="mdi-content-save"
                                            single-line hide-details @click:append-inner="cadastrarPessoas()">
                                        </v-text-field>


                                        <!-- IMPUT PARA EDITAR -->
                                        <v-text-field v-if="contador == 1" v-model="pessoa.nome" density="compact"
                                            variant="solo" label="Convidados"
                                            append-inner-icon="mdi-content-save-edit-outline" single-line hide-details
                                            @click:append-inner="alterarPessoa()">
                                        </v-text-field>
                                    </v-card-text>
                                </v-card>

                                <!-- -----------LISTA------------- -->
                                <v-expand-transition>
                                    <v-alert v-if="mensagens.excluidoSucesso" type="error">EXCLUÍDO</v-alert>
                                    <v-alert v-if="mensagens.salvoSucesso" type="success">SUCESSO</v-alert>
                                    <v-alert v-if="mensagens.alteradoSucesso" type="info">MODIFICADO</v-alert>
                                </v-expand-transition>


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
                                        
                                        <tr v-for="(post, i) in pessoas" :key="post">
                                            <td class="quant">{{ i + 1 }}</td>
                                        <td class="nome">{{ post.nome }}</td>
                                            <td>
                                                <div class="botoesD">
                                                    <v-col cols="auto">
                                                        <v-btn density="compact" icon="mdi-trash-can-outline"
                                                            @click="deletarPessoa(post._id, i)"
                                                            style="background-color: #c98f8f;"></v-btn>
                                                    </v-col>
                                                    <v-col cols="auto">
                                                        <v-btn density="compact" icon="mdi-pencil"
                                                            @click="editarPessoa(id, i)"
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
.bg-info {
    display: flex;
    padding: 1px;
    justify-content: center;
}

.bg-error {
    display: flex;
    padding: 1px;
    justify-content: center;
}

.bg-success {
    display: flex;
    padding: 1px;
    justify-content: center;
}


.v-locale--is-ltr {
    background-color: #e5d1b8;
}

.total {
    font-family: math;
}

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
import axios from 'axios'

export default {

    data() {
        return {
            mensagens: {
                salvoSucesso: false,
                excluidoSucesso: false,
                alteradoSucesso: false

            },
            contador: 0,
            posicao: "",
            pessoas: [],
            pessoa: {},
            quant: ''


        };
    },

    methods: {
        async cancelar() {
            this.pessoa = {}
        },

        // ------------CARREGAR TELA ---------------------------
        async carregarPessoas() {
            //request para API, que retorna uma promisse 
            let request = await axios.get("https://api-my-app32-git-main-melvimjones.vercel.app/person")

            //Ao finalizar o request, carregue os dados em json
            this.pessoas = await request.data
            this.pessoas.reverse()
            //Quantidade Total
            this.quant = this.pessoas.length
            //exibir no consoel
            console.log(this.pessoas)
        },

        // ------------CADASTRAR PESSOAS ---------------------------
        async cadastrarPessoas() {
            let request = await axios.post("https://api-my-app32-git-main-melvimjones.vercel.app/person", this.pessoa)
            let people = await request.data
            //Add na array
            this.pessoas.push(people)
            //Carregar tela
            this.carregarPessoas()
            //Limpar imput
            this.pessoa.nome = ""
            this.cancelar()

            //----Mensagem ------
            this.mensagens.salvoSucesso = true
            //temporizador
            setTimeout(() => {
                this.mensagens.salvoSucesso = false
            }, 1000);

            //mostar no console
            console.log(this.pessoas);
        },

        async editarPessoa(id, i) {
            //acessar do array e colocar no imput
            this.pessoa = { ...this.pessoas[i] }
            //this.posicao = i
            this.contador = 1
        },

        async alterarPessoa() {
            await axios.patch("https://api-my-app32-git-main-melvimjones.vercel.app/person/" + this.pessoa._id, this.pessoa)
            //alterar na tela
            this.carregarPessoas()
            //Limpar imput
            this.pessoa.nome = ""
            this.contador = 0
            //----Mensagem ------
            this.mensagens.alteradoSucesso = true
            //temporizador
            setTimeout(() => {
                this.mensagens.alteradoSucesso = false
            }, 1000);
        },

        async deletarPessoa(id, i) {

            await axios.delete("https://api-my-app32-git-main-melvimjones.vercel.app/person/" + id)
            //excluir do array
            this.pessoas.splice(i, 1)
            this.pessoa.nome = ""

            //-----mensagem -----
            this.cancelar()
            this.mensagens.excluidoSucesso = true

            //temporizador
            setTimeout(() => {
                this.mensagens.excluidoSucesso = false
            }, 1000);

            // --- carregar Tela----

            this.carregarPessoas()


        }
    },
    async created() {
        console.log("Created....")
        await this.carregarPessoas()
    }
};
</script>
      