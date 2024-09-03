import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Navbar from "../../component/Navbar";

const DonatePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-sm">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Title" value="Title" />
              </div>
              <TextInput id="Title" type="text" placeholder="Title" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Qty" value="Qty" />
              </div>
              <TextInput id="Qty" type="number" placeholder="Qty" required />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default DonatePage;
