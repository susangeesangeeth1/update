import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";
import { QrReader } from "react-qr-reader";
import { CheckSVG, CloseSVG } from "@/icons";
import {
	addEmployee,
	setModalOpen,
	setSelectedEmployee,
	updateEmployee,
} from "@/store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();
	const [Data1, setData1] = useState("Scan...");
	const state = useSelector((state) => state.employee);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedEmployee(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedEmployee) {
			dispatch(
				updateEmployee({
					_id: state.selectedEmployee._id,
					...data,
				})
			);
		} else {
			dispatch(addEmployee(data));
		}
	};

	useEffect(() => {
		if (state.selectedEmployee) {
			setValue("name", state.selectedEmployee.name);
			setValue("email", state.selectedEmployee.email);
			setValue("address", state.selectedEmployee.address);
			//setValue("phone", state.selectedEmployee.phone);
		}
	}, [state.selectedEmployee, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedEmployee ? (
									<>
										<span>Edit</span>
									</>
								) : (
									<>
										<span>Add</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<QrReader
									onResult={(result, error) => {
										if (!!result) {
											setData1(result?.text);
										}

										if (!!error) {
											console.info(error);
										}
									}}
									//this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
									// open the front camera
									constraints={{ facingMode: "environment" }}
									style={{ width: "30%", height: "30%" }}
								/>
								<label
									htmlFor="nameInput"
									className={cx("label", errors.name && "label--error")}
								>
									{errors.name ? (
										"Full name is required!"
									) : (
										<>
											Name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									value={Data1}
									placeholder="Full name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="emailInput"
									className={cx("label", errors.email && "label--error")}
								>
									{errors.email ? (
										`${errors.email.message}`
									) : (
										<>
											Rs&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="emailInput"
									name="email"
									placeholder="Rs."
									className={cx("input", errors.email && "input--error")}
									ref={register({
										required: "Rs. is required!",
									})}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="addressArea"
									className={cx("label", errors.address && "label--error")}
								>
									{errors.address ? (
										"Date is required!"
									) : (
										<>
											Date&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="date"
									id="addressArea"
									name="address"
									placeholder="Address"
									className={cx("area", errors.address && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedEmployee ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
