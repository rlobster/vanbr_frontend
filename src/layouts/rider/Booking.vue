<template>
    <div class="booking">
      <div class="title text-center">Book a Ride</div>
      <div class="form-content">
        <form class="form-book" name="book">
          <div class="form-group form-group-first">
            <label class="form-label">From</label>
            <input type="text" class="form-control" name="from">
          </div>
          <div class="form-group form-group-first">
            <label class="form-label">To</label>
            <input type="text" class="form-control" name="from">
          </div>
          <div class="form-group form-group-first">
            <label class="form-label">Car Type</label>
            <select class="form-control full"
							name="typeName"
							placeholder='Select Car Type'
							value='typeName'>
						<option disabled="" selected="" value="">Select Type</option>
						<option value="van">Mini Van</option>
						<option value="sedan">Sedan</option>
					</select>
					<p class="form-help"></p>
          </div>
          <div layout="row" class="form-group form-group-first">
            <button class="btn btn-secondary">Cancel</button>
            <button class="btn btn-primary">Book</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
  import Routes from '@/router/routes';

  export default {
    name: 'Booking',
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style scoped>
.form-book {
  padding: 30px;
}
select {
	padding-right: 20px !important;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAAG1BMVEX29vb////a2trY2NjR0dHPz898fHw1NTUzMzPZTrIRAAAACHRSTlMAACQnMDOf/MzvbR8AAABRSURBVBjTYxBEAgIMNOKJhAKBI4wn1gEEiTCeUEVHR7shjCeQ0dHRxgjnqXd0FCF4bB0dCQgeU0W7AoLHkNHGgMRTL0LmsSUg85gUEDza+h0AhtUgghQsQ7oAAAAASUVORK5CYII=');
	background-repeat: no-repeat;
	background-position: right center;
	background-size: 18px;

	/* autoprefixer: off */
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	&::-ms-expand {
		display: none
	}
	&[disabled],
	&[readonly] {
		background-image: none;
	}
	option[disabled].title {
		color: $primary-color;
	}
}

input,
textarea,
select,
button {
	font-family: inherit;
}

.form-group {
	margin-bottom: 20px;
	.form-help { visibility: hidden; }
	&.full { width: 100%; }
}

.form-group__error {
	.form-help {
		color: $error-color;
		visibility: visible;
	}
	.form-control {
		border-color: $error-color;
		box-shadow: 0 0 0 1px $error-color;
		&:focus {
			border-color: $error-color;
			box-shadow: 0 0 0 1px $error-color;
		}
	}
}

.form-group__success {
	.form-help {
		color: $success-color;
		visibility: visible;
	}
	.form-control {
		border-color: $success-color;
		box-shadow: 0 0 0 1px $success-color;
		&:focus {
			border-color: $success-color;
			box-shadow: 0 0 0 1px $success-color;
		}
	}
}

.form-label {
	display: block;
	margin-bottom: 8px;
	color: $primary-font-color;
	line-height: 1;
	font-size: 14px;
}

.form-control {
	padding: 7px 12px;
	border: 1px solid $primary-gray-color;
	border-radius: 4px;
	font-family: inherit;
	font-size: inherit;
	background-color: transparent;
	textarea { resize: none; }
	&.full { width: 100%; }
	&.form-control--sm {
		padding: 5px 5px;
		border-radius: 2px;
	}
	&[disabled],
	&[readonly] {
		cursor: not-allowed;
	}
	&:not([readonly]):not([disabled]):focus {
		border-color: $primary-color;
		box-shadow: 0 0 0 1px $primary-color;
		outline: none;
	}
}

.form-content {
  background: white;
  width: 60%;
  margin-left: 22%;
  flex: 0 0 60%;
  padding-right: 30px;
  margin-bottom: 30px;
  @media(max-width: 960px) {
    padding-right: 0px;
  }
}

</style>
