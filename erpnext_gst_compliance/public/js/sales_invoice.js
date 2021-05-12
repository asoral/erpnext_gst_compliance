frappe.ui.form.on('Sales Invoice', {
	async refresh(frm) {
		const invoice_eligible = await get_einvoice_eligibility(frm.doc);

		if (!invoice_eligible) return;

		const { irn, irn_cancelled, ewaybill, eway_bill_cancelled, __unsaved } = frm.doc;

		const add_einvoice_button = (label, action) => {
			if (!frm.custom_buttons[label]) {
				frm.add_custom_button(label, action, __('Cleartax'));
			}
		};
		

		if (!irn && !__unsaved) {
			// Generate IRN
		}

		if (irn && !irn_cancelled && !ewaybill) {
			// Cancel IRN
		}

		if (irn && !irn_cancelled && !ewaybill) {
			// Generate E-Way Bill
		}

		if (irn && ewaybill && !irn_cancelled && !eway_bill_cancelled) {
			// Cancel E-Way Bill
		}
	}
});

const get_einvoice_eligibility = async (doc) => {
	frappe.dom.freeze();
	const { message: invoice_eligible } = await frappe.call({
		method: 'erpnext_e_invoicing.utils.validate_einvoice_eligibility',
		args: { doc: doc }
	});
	frappe.dom.unfreeze();

	return invoice_eligible;
}