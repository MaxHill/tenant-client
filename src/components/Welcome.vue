<template>
    <div class="Container">
        <br>
        <br>
       <h1>Welcome</h1>
       <form class="Form">
       <div class="Form__group">
            <div class="Form__field">
                <label for="">Title:</label> <br>
                <input type="text" placeholder="I like turtles..">
            </div>
            <div class="Form__field">
                <label for="">Sub-title:</label> <br>
                <input type="text" placeholder="Because they are awesome..">
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <label for="">Comment:</label><br>
                <textarea name="Comment" id="" cols="30" rows="10" placeholder="This is why they are awesome..."></textarea>
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <button class="Button">Comment</button>
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <button class="Button Button--danger">Don't comment</button>
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <button class="Button Button--success">Already commented</button>
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <button class="Button Button--block">Really comment</button>
            </div>
        </div>
       </form>
    </div>
</template>

<script>
    import Bus from '../Bus';

    export default {
        data() {
            return {};
        },
        ready() {
            Bus.$emit('test');
        }
    };
</script>
