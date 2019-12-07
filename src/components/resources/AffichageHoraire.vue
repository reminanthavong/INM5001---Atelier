<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1>
                <h3>Choisissez l'horaire a afficher selon :</h3>

                <table id="choixpourafficherhoraire" style="width:100%">
                    <tr>
                        <th>Nom de l'horaire:</th>
                        <th>Date de l'horaire:</th>
                    </tr>
                    <tr>
                        <td>
                            <select v-model="selectionne" id="listeSemaines">
                                <option v-for="nom in nomsHoraire" v-bind:value="nom.idtablehoraire">
                                    {{ nom.idtablehoraire }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <datepicker v-model="dateshoraire" name="dateshoraire"></datepicker>
                        </td>
                    </tr>
                </table>

                <table id="tabledesHoraire"></table>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    name: 'affichageHoraire',
    components: {
        Datepicker
    },
    data: function() {
        return {
            selectionne: '',
            dateshoraire: null,
            nomsHoraire: null
        }
    },
    mounted: function() {
        fetch('choixHoraire', {
             method: 'GET'
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.nomsHoraire = data
            console.log(this.nomsHoraire)
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>
