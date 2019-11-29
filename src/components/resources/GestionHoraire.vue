<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Générer un horaire:</h1>
                <br/>
                <div class="container">
                    <h4> Entrer le nombre d'employé nécessaire par quart de travail: </h4>
                    <br/>
                    <form class="form-inline">
                        <div class="form-group">
                            <div class="form-group">
                                <label for='horairedate'>Date(entrer la date du lundi):</label>
                                <input type='date' id='horairedate' class='form-control' required='required'>
                            </div>

                            <br/>
                            <br/>

                            <label for="jour">Lundi:</label>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="lundijour">Jour:</label>
                            <input type="text" class="form-control" id="lundijour" name="lundijour" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="lundisoir">Soir:</label>
                            <input type="text" class="form-control" id="lundisoir" name="lundisoir" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="lundinuit">Nuit:</label>
                            <input type="text" class="form-control" id="lundinuit" name="lundinuit" pattern='[0-9]' required='required'>
                        </div>

                        <br/>
                        <br/>

                        <div class="form-group">
                            <label for="jour">Mardi:</label>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="mardijour">Jour:</label>
                            <input type="text" class="form-control" id="mardijour" name="mardijour" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="mardisoir">Soir:</label>
                            <input type="text" class="form-control" id="mardisoir" name="mardisoir" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="mardinuit">Nuit:</label>
                            <input type="text" class="form-control" id="mardinuit" name="mardinuit" pattern='[0-9]' required='required'>
                        </div>

                        <br/>
                        <br/>

                        <div class="form-group">
                            <label for="jour">Mercredi:</label>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="mercredijour">Jour:</label>
                            <input type="text" class="form-control" id="mercredijour" name="mercredijour" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="mercredisoir">Soir:</label>
                            <input type="text" class="form-control" id="mercredisoir" name="mercredisoir" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="mercredinuit">Nuit:</label>
                            <input type="text" class="form-control" id="mercredinuit" name="mercredinuit" pattern='[0-9]' required='required'>
                        </div>

                        <br/>
                        <br/>

                        <div class="form-group">
                            <label for="jour">Jeudi:</label>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="jeudijour">Jour:</label>
                            <input type="text" class="form-control" id="jeudijour" name="jeudijour" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="jeudisoir">Soir:</label>
                            <input type="text" class="form-control" id="jeudisoir" name="jeudisoir" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="jeudinuit">Nuit:</label>
                            <input type="text" class="form-control" id="jeudinuit" name="jeudinuit" pattern='[0-9]' required='required'>
                        </div>

                        <br/>
                        <br/>

                        <div class="form-group">
                            <label for="jour">Vendredi:</label>
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="vendredijour">Jour:</label>
                            <input type="text" class="form-control" id="vendredijour" name="vendredijour" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="vendredisoir">Soir:</label>
                            <input type="text" class="form-control" id="vendredisoir" name="vendredisoir" pattern='[0-9]' required='required'>
                        </div>
                        <div class="form-group">
                            <label for="vendredinuit">Nuit:</label>
                            <input type="text" class="form-control" id="vendredinuit" name="vendredinuit" pattern='[0-9]' required='required'>
                        </div>

                        <br/>
                        <br/>

                        <button class='btn btn-primary' style='background-color:grey; border:none' id="btngenererhoraire" name='btngenererhoraire' value='btngenererhoraire'>Générer</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Heading</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    </div>
</template>
<script>
</script>
