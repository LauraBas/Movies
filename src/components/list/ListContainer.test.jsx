import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import ApiClient from "../../ApiClient"
import ListContainer from "./ListContainer";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should call apiClient and pass results to List", async () => {
    server.use(
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        }))

    render(<ListContainer />)

    expect(await screen.findByText("Tenet")).toBeInTheDocument();
})

test("should call apiClient on update and refresh list", async () => {
    let tenetHasBeenUpdated = false
    server.use(
        rest.put('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            if (req.body.title == "TenetCHANGED") {
                tenetHasBeenUpdated = true;
                return res(ctx.status(200));
            }
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenUpdated
                ? res(ctx.json([{title: "TenetCHANGED", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
                : res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        })
    )
    render(<ListContainer />)

    await updateMovieTitle('Tenet', 'TenetCHANGED')

    expect(await screen.findByText("TenetCHANGED")).toBeInTheDocument();
})

test("should display an error if there is an error when updating", async () => {
    server.use(
        rest.put('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            return res(ctx.status(500));
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        })
    )

    render(<ListContainer />)

    await updateMovieTitle('Tenet', 'TenetCHANGED')

    expect(await screen.findByText("Error updating movie")).toBeInTheDocument();
})

test("should delete a movie and refresh list", async () => {
    let tenetHasBeenDeleted = false;
    server.use(
        rest.delete('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            tenetHasBeenDeleted = true;
            return res(ctx.status(200));            
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenDeleted
                ? res(ctx.json([]))
                : res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        })
    )
    render(<ListContainer />)

    fireEvent.click(await screen.findByText("Delete"))
    await waitForElementToBeRemoved(await screen.findByText("Tenet"));
})


test("should create a movie and refresh list", async () => {
    let tenetHasBeenCreated = false;
    server.use(
        rest.post('http://localhost:3001/peliculas', (req, res, ctx) => {
            if (req.body.title == "Tenet") {
                tenetHasBeenCreated = true;
                return res(ctx.status(200));            
            }
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenCreated
                ? res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
                : res(ctx.json([]))
        })
    )
    render(<ListContainer />)

    await createMovieWithTitle('Tenet')

    expect(await screen.findByText("Tenet")).toBeInTheDocument();
});

async function updateMovieTitle(movieToUpdate, movieChanged) {
    fireEvent.click(await screen.findByText("Edit"))
    const input = screen.getByPlaceholderText(movieToUpdate);
    fireEvent.change(input, { target: { value: movieChanged  } })
    fireEvent.click(screen.getByText('Submit'))
}

async function createMovieWithTitle(movieTitle){
    fireEvent.click(screen.getByText("Create")); 
    const input = screen.getByPlaceholderText('title');
    fireEvent.change(input, { target: { value: movieTitle } });
    fireEvent.click(screen.getByText('Submit'));
}