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
                            <select id="listeSemaines"></select>
                        </td>
                        <td>
                            <input id='datesemaine' width="120">
                        </td>
                    </tr>
                </table>

                <table id="tabledesHoraire"></table>
            </div>
        </div>
    </div>
</template>
<script>
</script>
