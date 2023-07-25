import { Operations } from 'components/Operations';
import { Container, OperationsContainer } from './styles';
import { useImages } from 'hooks/images';
import { Checkbox } from 'components/Checkbox';
import {
  ARITHMETICS_OPERATIONS,
  ArithmeticOperationKey,
} from 'types/operationsNames/arithmetics';
import {
  LOGICS_OPERATIONS,
  LogicOperationKey,
} from 'types/operationsNames/logics';

export const OperationPanel = () => {
  const { selectedImages, normalizeValues, setNormalizeValues } = useImages();
  const oneImageSelected = selectedImages.length === 1;

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <Checkbox
        label="Normalizar valores"
        checked={normalizeValues}
        handleChange={setNormalizeValues}
      />

      <OperationsContainer>
        <Operations.Root title="Aritméticas">
          {Object.entries(ARITHMETICS_OPERATIONS).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as ArithmeticOperationKey}
            >
              {oneImageSelected && <Operations.Input />}
            </Operations.Operation>
          ))}
        </Operations.Root>

        <Operations.Root title="Lógicas">
          {Object.entries(LOGICS_OPERATIONS).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as LogicOperationKey}
            >
              {oneImageSelected && <Operations.Input />}
            </Operations.Operation>
          ))}
        </Operations.Root>

        <Operations.Root title="Transformações">
          <Operations.Transformations />
        </Operations.Root>
      </OperationsContainer>
    </Container>
  );
};
