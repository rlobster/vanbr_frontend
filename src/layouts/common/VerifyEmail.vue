<template>
    <div class="login container main-app-section-sm">
        <Card class="mx-auto">
            <div>Your email is {{ status }}!!!!</div>
        </Card>
    </div>
</template>

<script>

    import Card from '@/components/Card';
    
    export default {
        name: 'VerifyEmail',
        components: { Card },
        data() {
            return {
                Routes,
                AppURL,
                status: 'verifing'
            };
        },
        mounted() {
            const token = this.$route.params.token;
            if (token) {
                this.token = token;
            } else {
                this.$router.push(Routes.Login);
            }
            const data = { token };
            try {
                await this.axios.post(`${this.AppURL}/email-verify`, data);
                this.status = 'verified';
                setTimeout(() =>{
                    this.$router.push(Routes.Login);
                }, 1000)
            } catch (e) {
                this.status = 'not verified';
                setTimeout(() =>{
                    this.$router.push(Routes.Login);
                }, 1000)
                console.warn(e);
            }
        },
    }
</script>