import {render, screen, fireEvent } from  '@testing-library/react'

import Form from "./form";

test('Should render a placeholder', () => {
    render( <Form title="tenet"/>)
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});